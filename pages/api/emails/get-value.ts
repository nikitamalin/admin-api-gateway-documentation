import { isValidToken } from "@/utils/auth";
import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string().email(),
  idToken: z.string(),
  value: z.string()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, idToken, value } = schema.parse(JSON.parse(req.body));

  if (!isValidToken(email, idToken)) {
    return res.status(405).json({ message: "Invalid token" });
  }

  const isInSet = await kv.sismember("emailWhiteList", value);
  return res.status(200).json({ isAllowed: isInSet });
}
