export function dstOffset() {
  let d = new Date();
  let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  let isDst = false;
  if (jan === d.getTimezoneOffset()) {
    isDst = true;
  }
  let offset = 7;
  if (isDst) {
    offset = 8;
  }
  return offset;
}

export function getCaliforniaTime() {
  let date = new Date();
  return new Date(date.getTime() - dstOffset() * 60 * 60 * 1000);
}

export function isWeekendPST() {
  // PDT 2nd Sunday March to 1st Sunday Nov - 7 hours behind
  // PST the rest - 8 hours behind

  const dayOfWeek = getCaliforniaTime().getDay();
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
