import csrf from "csurf";
export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
  },
});
