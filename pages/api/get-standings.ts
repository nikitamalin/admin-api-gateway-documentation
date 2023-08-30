import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    let result = await prisma.standings.findMany({
      select: {
        driver: true,
        fan_votes: true,
        image: true
      }
    });
    let deserializeResult = result.map((obj: any) => {
      obj.fan_votes = obj.fan_votes.toString();
      return obj;
    });
    res.status(200).json(deserializeResult);
  } catch (err) {
    console.log("ERR: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
  return;
}
