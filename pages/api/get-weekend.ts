import type { NextApiRequest, NextApiResponse } from "next";
import { isWeekendPST } from "@/utils/validation";
import geoip from "geoip-lite";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    var ip =
      (req.headers["x-forwarded-for"] as string)?.split(",").shift() ||
      req.socket?.remoteAddress ||
      "";
    const isEU = (ip: any) => {
      const geo = geoip.lookup(ip);
      return geo && geo.country === "EU";
    };
    if (isEU(ip)) {
      res.status(400).json({ isWeekend: false, isEu: true });
    }

    if (!isWeekendPST() && false) {
      res.status(200).json({
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
