import jwt from "jsonwebtoken";

export function isValidToken(email: string, idToken: string) {
  const decodedToken: any = jwt.decode(idToken);
  const currentTime = Math.floor(Date.now() / 1000);
  if (
    !decodedToken ||
    !decodedToken.iss ||
    !decodedToken.exp ||
    !decodedToken.auth_time ||
    !decodedToken.iat ||
    decodedToken.email !== email ||
    decodedToken.iss !== "https://cariq-api.us.auth0.com/" ||
    decodedToken.exp < currentTime ||
    Math.abs(decodedToken.auth_time - decodedToken.iat) > 5
  ) {
    return false;
  }
  return true;
}
