const jwt = require("jsonwebtoken");

export function isValidToken(idToken: string, phoneNumber: string) {
  const decodedToken = jwt.decode(idToken);
  const currentTime = Math.floor(Date.now() / 1000);
  if (
    !decodedToken ||
    !decodedToken.iss ||
    !decodedToken.exp ||
    !decodedToken.auth_time ||
    !decodedToken.iat ||
    decodedToken.name !== phoneNumber ||
    decodedToken.iss !== "https://fab4.us.auth0.com/" ||
    // decodedToken.exp > currentTime ||
    Math.abs(decodedToken.auth_time - decodedToken.iat) > 5
  ) {
    return false;
  }

  return true;
}
