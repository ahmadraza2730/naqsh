import { z } from "zod";

export const REGIONS = ["pakistan", "international"] as const;
export const PAY_METHODS = ["bank", "jazzcash", "easypaisa", "payoneer", "fiverr"] as const;

export const budgets = {
  pakistan: ["Under Rs 5,000", "Rs 5,000–15,000", "Rs 15,000–40,000", "Rs 40,000–100,000", "Over Rs 100,000"],
  international: ["Under $50", "$50–150", "$150–400", "$400–1,000", "Over $1,000"],
} as const;

export const payLabels: Record<(typeof PAY_METHODS)[number], string> = {
  bank: "Bank transfer",
  jazzcash: "JazzCash",
  easypaisa: "Easypaisa",
  payoneer: "Payoneer",
  fiverr: "Fiverr",
};

export const payByRegion = {
  pakistan: ["bank", "jazzcash", "easypaisa"],
  international: ["payoneer", "fiverr"],
} as const;

export const briefSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter an email address we can reply to.").max(200),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s()-]*$/, "Use digits only, for example +92 300 1234567.")
    .optional()
    .or(z.literal("")),
  business: z.string().trim().max(160).optional().or(z.literal("")),
  region: z.enum(REGIONS),
  service: z.string().trim().min(1, "Choose a service or package.").max(80),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  deadline: z.string().trim().max(20).optional().or(z.literal("")),
  details: z.string().trim().min(20, "Tell us a little more, at least a sentence or two.").max(5000),
  references: z.string().trim().max(1500).optional().or(z.literal("")),
  payment: z.enum(PAY_METHODS),
  // Honeypot. Real people never see or fill this.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type Brief = z.infer<typeof briefSchema>;
