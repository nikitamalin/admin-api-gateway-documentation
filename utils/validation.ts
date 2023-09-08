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
  return true;

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

  let emailList = [
    "bigballs@aol.com",
    "ang10@yahoo.com",
    "ang11@yahoo.com",
    "ang12@yahoo.com",
    "ang13@yahoo.com",
    "ang14@yahoo.com",
    "ang15@yahoo.com",
    "ang16@yahoo.com",
    "ang17@yahoo.com",
    "ang18@yahoo.com",
    "ang1@yahoo.com",
    "ang20@yahoo.com",
    "ang21@yahoo.com",
    "ang22@yahoo.com",
    "ang23@yahoo.com",
    "ang24@yahoo.com",
    "ang25@yahoo.com",
    "ang26@yahoo.com",
    "ang27@yahoo.com",
    "ang28@yahoo.com",
    "ang2@yahoo.com",
    "ang30@yahoo.com",
    "ang31@yahoo.com",
    "ang32@yahoo.com",
    "ang33@yahoo.com",
    "ang34@yahoo.com",
    "ang35@yahoo.com",
    "ang36@yahoo.com",
    "ang37@yahoo.com",
    "ang38@yahoo.com",
    "ang39@yahoo.com",
    "ang3@yahoo.com",
    "ang40@yahoo.com",
    "ang41@yahoo.com",
    "ang42@yahoo.com",
    "ang43@yahoo.com",
    "ang44@yahoo.com",
    "ang45@yahoo.com",
    "ang46@yahoo.com",
    "ang47@yahoo.com",
    "ang48@yahoo.com",
    "ang49@yahoo.com",
    "ang4@yahoo.com",
    "ang50@yahoo.com",
    "ang51@yahoo.com",
    "ang52@yahoo.com",
    "ang53@yahoo.com",
    "ang54@yahoo.com",
    "ang55@yahoo.com",
    "ang56@yahoo.com",
    "ang57@yahoo.com",
    "ang59@yahoo.com",
    "ang5@yahoo.com",
    "ang60@yahoo.com",
    "ang61@yahoo.com",
    "ang62@yahoo.com",
    "ang63@yahoo.com",
    "ang64@yahoo.com",
    "ang65@yahoo.com",
    "ang66@yahoo.com",
    "ang67@yahoo.com",
    "ang68@yahoo.com",
    "ang6@yahoo.com",
    "ang70@yahoo.com",
    "ang7@yahoo.com",
    "ang8@yahoo.com",
    "ang9@yahoo.com",
    "ang@yahoo.com",
    "aa.aa@aa.com",
    "aa@aa.com",
    "aa@aol.com",
    "aa@onlyfans.com",
    "aaa@aol.com",
    "aaa@yahoo.com",
    "aaaaa@gmail.com",
    "aaaaaaaa@gmail.com",
    "a@a.com",
    "a@ao.com",
    "a@aol.com",
    "a@onlyfans.com",
    "a@yahoo.com",
    "12@yahoo.com",
    "12machine@yahoo.com",
    "12@yahoo.com",
    "12machine@yahoo.com"
  ];

  if (email in emailList) {
    return false;
  }

  return true;
}
