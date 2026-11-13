import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { briefSchema } from "@/lib/brief";

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
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "The brief form is not connected to the database yet. Please contact the studio directly." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("briefs")
    .insert({
      name: brief.name,
      email: brief.email,
      whatsapp: brief.whatsapp || null,
      business: brief.business || null,
      region: brief.region,
      service: brief.service,
      budget: brief.budget || null,
      deadline: brief.deadline || null,
      details: brief.details,
      references_text: brief.references || null,
      payment_method: brief.payment,
      user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    })
    .select("ref")
    .single();

  if (error) {
    console.error("Supabase insert failed", error);
    return NextResponse.json({ error: "Your brief could not be saved. Try again in a minute." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ref: data.ref });
}
