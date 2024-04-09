import { isValidToken } from "@/utils/auth";
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string().email(),
  idToken: z.string()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, idToken } = schema.parse(req.query);

  if (!isValidToken(email, idToken)) {
    return res.status(405).json({ message: "Invalid token" });
  }

  const domains = await kv.smembers("domainWhiteList");
  domains.sort();
  return res.status(200).json(domains);
}
