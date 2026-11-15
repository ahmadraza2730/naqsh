import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { briefSchema } from "@/lib/brief";
import { notifyWhatsApp } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data could not be read. Refresh the page and try again." }, { status: 400 });
  }

  const parsed = briefSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json({ error: "Some fields need attention.", fields }, { status: 422 });
  }

  const { website, ...brief } = parsed.data;
  // Bots fill the hidden field. Pretend it worked and store nothing.
  if (website) return NextResponse.json({ ok: true, ref: "NQ-000000" });

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  // The public (anon / publishable) key is enough: it can only call submit_brief().
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "The brief form is not connected to the database yet. Please contact the studio directly." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc("submit_brief", {
    p_name: brief.name,
    p_email: brief.email,
    p_whatsapp: brief.whatsapp || "",
    p_business: brief.business || "",
    p_region: brief.region,
    p_service: brief.service,
    p_budget: brief.budget || "",
    p_deadline: brief.deadline || null,
    p_details: brief.details,
    p_references: brief.references || "",
    p_payment: brief.payment,
    p_user_agent: req.headers.get("user-agent") ?? "",
  });

  if (error || !data) {
    console.error("Supabase submit_brief failed", error);
    return NextResponse.json({ error: "Your brief could not be saved. Try again in a minute." }, { status: 500 });
  }

  await notifyWhatsApp(data as string, brief);

  return NextResponse.json({ ok: true, ref: data as string });
}
