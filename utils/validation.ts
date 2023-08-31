export function isWeekendPST() {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const pstOffset = -8 * 60;

  const pstTime = new Date(utcTime + pstOffset * 60000);
  const dayOfWeek = pstTime.getDay();

  return dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
}

export function isEmailValid(email: string) {
  /*
      - Check email domsins are fine
      - Email is not blacklisted
  */
  if (email.endsWith("onlyfans.com") || email.includes("onlyfans")) {
    return false;
  }

  let emailList = ["bigballs@aol.com"];

  if (email in emailList) {
    return false;
  }
  return true;
}
