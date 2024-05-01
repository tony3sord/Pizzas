import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Usuario from "../models/usuario.js";

const passportlocal = passport.use(
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        const user = await Usuario.findOne({ usuario: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

export default passportlocal;
