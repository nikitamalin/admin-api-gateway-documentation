import type { NextApiRequest, NextApiResponse } from "next";
import { isWeekendPST } from "@/utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    if (!isWeekendPST() && false) {
      res.status(400).json({
        isWeekend: false
      });
    } else {
      res.status(200).json({
        isWeekend: true
      });
    }
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
  return;
}
