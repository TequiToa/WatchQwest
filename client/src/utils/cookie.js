export const createCookie = (cookieName, cookieValue, nbJourValide) => {
  let d = new Date();
  d.setTime(d.getTime() + nbJourValide * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  console.log(
    "🍪 Creation du cookie :",
    `${cookieName}=${cookieValue}; ${expires}`
  );
  document.cookie = `${cookieName}=${cookieValue}; ${expires}; SameSite=Strict;`;
};

export const getCookie = (cookieName) => {
  //todo optimisable
  const name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
