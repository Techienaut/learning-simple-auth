import csrf from "csurf";
export const csrfProtection = csrf({
  cookie: true,
  // cookie: {
  //   httpOnly: true,
  //   maxAge: 3600,
  // },
});
