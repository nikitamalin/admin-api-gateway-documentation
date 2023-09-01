const jwt = require("jsonwebtoken");

export function isValidToken(idToken: string, email: string) {
  const decodedToken = jwt.decode(idToken);
  const currentTime = Math.floor(Date.now() / 1000);
  if (
    !decodedToken ||
    !decodedToken.email ||
    !decodedToken.iss ||
    !decodedToken.exp ||
    !decodedToken.auth_time ||
    !decodedToken.iat ||
    decodedToken.email !== email ||
    decodedToken.iss !== "https://fab4.us.auth0.com/" ||
    decodedToken.exp < currentTime ||
    Math.abs(decodedToken.auth_time - decodedToken.iat) > 5
  ) {
    return false;
  }
  return true;
}
