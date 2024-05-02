import express from "express";
const router = express.Router();
import passport from "passport";
import passportlocal from "../utils/passport.js";
import Usuario from "../models/usuario.js";
import validar from "../utils/validarusaurio.js";

//Estrategia de Autenticacion local
passportlocal;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

//register user
router.post("/registrar", async (req, res) => {
  const { nombre, apellidos, correo, usuario, password } = req.body;
  let { rol } = req.body;
  try {
    const validado = await validar(usuario, correo);
    if (validado) return res.status(400).send("Usuario o correo ya existente");
    let newUser = new Usuario();
    if (!rol) rol = "Cliente";
    newUser = {
      nombre,
      apellidos,
      correo,
      usuario,
      password,
      rol,
    };
    await Usuario.create(newUser);
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//logout
router.get("/logout", (req, res) => {
  try {
    req.logout(() => {});
    return res.status(200).send("Se ha cerrado la sesión correctamente");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//get the current user
router.get("/usuarioactual", (req, res) => {
  if (req.isAuthenticated()) {
    const currentuser = req.user;
    return res.json(currentuser);
  } else {
    return res.status(401).send("No hay usuario logueado");
  }
});

//register user
router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.delete("/eliminarusuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findById(id);
    if (user) {
      const deleteUser = await Usuario.deleteOne({ user });
      if (deleteUser) {
        return res.status(200).send("Usuario eliminado correctamente");
      } else {
        return res.status(400).send("Error al eliminar el usuario");
      }
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
});

router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const a = await Usuario.findById(id);
    if (a) {
      return res.json(a);
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
});

router.patch("/editarusuario/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, correo, usuario } = req.body;
  const validado = await validar(usuario, correo);
  if (validado) return res.status(400).send("Usuario o correo ya existente");
  let a;
  try {
    a = {
      nombre,
      apellidos,
      correo,
      usuario,
    };
    const b = await Usuario.findByIdAndUpdate(id, a);
    if (b) return res.status(200).send("Usuario actualizado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
});

export default router;
