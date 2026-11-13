-- Naqsh: order / brief submissions.
-- Run this once in Supabase → SQL Editor.

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

-- Lock the table down. The website writes with the service-role key on the
-- server, which bypasses RLS; nobody can read or write with the public anon key.
alter table public.briefs enable row level security;
