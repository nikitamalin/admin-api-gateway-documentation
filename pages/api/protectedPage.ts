import { NextApiRequest, NextApiResponse } from "next";
import { stat } from "fs/promises";
import { createReadStream, existsSync } from "fs";
import path from "path";
import mime from "mime";
import { getSession } from "next-auth/react";

//basic nextjs api
export default async function getFile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    // for this i created folder in root folder (at same level as normal nextjs "public" folder) and the "somefile.png" is in it
    const someFilePath = path.resolve("./private/index.html");

    // if file is not located in specified folder then stop and end with 404
    if (!existsSync(someFilePath)) return res.status(404);

    // Create read stream from path and now its ready to serve to client
    const file = createReadStream(path.resolve("./private/index.html"));

    // set cache so its proper cached. not necessary
    // 'private' part means that it should be cached by an invidual(= is intended for single user) and not by single cache. More about in https://stackoverflow.com/questions/12908766/what-is-cache-control-private#answer-49637255
    //   res.setHeader("Cache-Control", `private, max-age=5000`);

    // set size header so browser knows how large the file really is
    // im using native fs/promise#stat here since theres nothing special about it. no need to be using external pckages
    const stats = await stat(someFilePath);
    res.setHeader("Content-Length", stats.size);

    // set mime type. in case a browser cant really determine what file its gettin
    // you can get mime type by lot if varieties of methods but this working so yay
    const mimetype = mime.getType(someFilePath);
    res.setHeader("Content-type", mimetype || "");

    // Pipe it to the client - with "res" that has been given
    file.pipe(res);
  } else {
    // User is not signed in
    res.status(401).json({ message: "Unauthorized" });
  }
  return;
}
