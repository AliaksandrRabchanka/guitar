export function cookieMonster(req, res, next): void {
  const cookies = {};
  const rawCookiesBuffer = req.headers.cookie ? req.headers.cookie.split('; ') : [];
  rawCookiesBuffer.forEach((rawCookie) => {
    // hack :D
    const cookieParts = rawCookie.split('=');
    if (cookieParts.length >= 2) {
      const cookieName = cookieParts[0];
      cookieParts.splice(0, 1);
      cookies[cookieName] = cookieParts.join('=');
    }
  });
  req.parsedCookies = cookies;
  next();
}
