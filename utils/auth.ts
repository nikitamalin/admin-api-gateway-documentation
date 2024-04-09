import jwt from "jsonwebtoken";

export function isValidToken(email: string, idToken: string) {
  const decodedToken: any = jwt.decode(idToken);
  const currentTime = Math.floor(Date.now() / 1000);
  console.log("DECODED TOKEN: ", decodedToken);
  if (
    !decodedToken ||
    !decodedToken.iss ||
    !decodedToken.exp ||
    !decodedToken.iat ||
    decodedToken.email !== email ||
    decodedToken.iss !== "https://accounts.google.com" ||
    decodedToken.exp < currentTime ||
    Math.abs(decodedToken.auth_time - decodedToken.iat) > 5
  ) {
    return false;
  }
  return true;
}
