import { NextApiRequest, NextApiResponse } from "next";
import { stat } from "fs/promises";
import { createReadStream, existsSync } from "fs";
import path from "path";
import mime from "mime";
import { getSession } from "next-auth/react";

export default async function getFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const someFilePath = path.resolve("./private/index.html");
    if (!existsSync(someFilePath)) return res.status(404);

    const file = createReadStream(path.resolve("./private/index.html"));

    // set cache so its proper cached. not necessary
    // 'private' part means that it should be cached by an invidual(= is intended for single user) and not by single cache. More about in https://stackoverflow.com/questions/12908766/what-is-cache-control-private#answer-49637255
    //   res.setHeader("Cache-Control", `private, max-age=5000`);

    const stats = await stat(someFilePath);
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Content-type", "text/html");
    file.pipe(res);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
  return;
}
