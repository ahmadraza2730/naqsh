import { allServices, packages, site } from "./site";
import type { Brief } from "./brief";

const label = (id: string) =>
  id.startsWith("package:")
    ? `${packages.find((p) => `package:${p.id}` === id)?.name ?? "Package"} package`
    : (allServices.find((s) => s.id === id)?.name ?? id);

/**
 * Sends a new-brief alert to the studio's WhatsApp through CallMeBot.
 * Turned on by setting CALLMEBOT_APIKEY on Vercel (and optionally WHATSAPP_NOTIFY_PHONE).
 * Never throws: a failed alert must not fail the client's submission.
 */
export async function notifyWhatsApp(ref: string, b: Omit<Brief, "website">) {
  const apikey = process.env.CALLMEBOT_APIKEY;
  const phone = process.env.WHATSAPP_NOTIFY_PHONE || site.contact.whatsapp;
  if (!apikey || !phone) return;

  const contactWa = b.whatsapp ? b.whatsapp.replace(/[^\d]/g, "").replace(/^0/, "92") : "";
  const text = [
    `*New brief ${ref}*`,
    `${b.name}${b.business ? ` (${b.business})` : ""}`,
    `Service: ${label(b.service)}`,
    b.budget ? `Budget: ${b.budget}` : "",
    b.deadline ? `Needed by: ${b.deadline}` : "",
    `Pays by: ${b.payment} (${b.region})`,
    ``,
    b.details.slice(0, 600),
    ``,
    `Email: ${b.email}`,
    contactWa ? `Reply on WhatsApp: https://wa.me/${contactWa}` : "",
  ]
    .filter((l, i, a) => l !== "" || (a[i - 1] ?? "") !== "")
    .join("\n");

  const url = `https://api.callmebot.com/whatsapp.php?phone=%2B${phone}&apikey=${encodeURIComponent(apikey)}&text=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) console.error("WhatsApp alert failed", res.status, (await res.text()).slice(0, 200));
  } catch (e) {
    console.error("WhatsApp alert error", e);
  }
}
