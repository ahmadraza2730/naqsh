-- Naqsh: order / brief submissions.
-- Run this once in Supabase → SQL Editor. Safe to re-run.

create sequence if not exists brief_ref_seq start 1001;

create table if not exists public.briefs (
  id              uuid primary key default gen_random_uuid(),
  ref             text unique not null default ('NQ-' || nextval('brief_ref_seq')),
  created_at      timestamptz not null default now(),
  status          text not null default 'new'
                  check (status in ('new', 'quoted', 'deposit_paid', 'in_progress', 'delivered', 'paid', 'cancelled')),
  name            text not null,
  email           text not null,
  whatsapp        text,
  business        text,
  region          text not null check (region in ('pakistan', 'international')),
  service         text not null,
  budget          text,
  deadline        date,
  details         text not null,
  references_text text,
  payment_method  text not null check (payment_method in ('bank', 'jazzcash', 'easypaisa', 'payoneer', 'fiverr')),
  quote_pkr       integer,
  notes           text,
  user_agent      text
);

create index if not exists briefs_created_at_idx on public.briefs (created_at desc);
create index if not exists briefs_status_idx on public.briefs (status);

-- Nobody can read or write the table with the public key.
alter table public.briefs enable row level security;
revoke all on public.briefs from anon, authenticated;

-- The website submits through this one function instead. It can only add a
-- brief and hand back its reference number; it can never read other briefs.
create or replace function public.submit_brief(
  p_name text,
  p_email text,
  p_whatsapp text,
  p_business text,
  p_region text,
  p_service text,
  p_budget text,
  p_deadline date,
  p_details text,
  p_references text,
  p_payment text,
  p_user_agent text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ref text;
begin
  if length(coalesce(p_details, '')) > 5000 or length(coalesce(p_name, '')) > 120 then
    raise exception 'Brief too long';
  end if;

  insert into public.briefs
    (name, email, whatsapp, business, region, service, budget, deadline, details, references_text, payment_method, user_agent)
  values
    (p_name, p_email, nullif(p_whatsapp, ''), nullif(p_business, ''), p_region, p_service, nullif(p_budget, ''),
     p_deadline, p_details, nullif(p_references, ''), p_payment, left(p_user_agent, 300))
  returning ref into v_ref;

  return v_ref;
end;
$$;

revoke all on function public.submit_brief from public;
grant execute on function public.submit_brief to anon, authenticated;
