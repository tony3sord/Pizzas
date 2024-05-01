import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

dotenv.config();

//Importando Rutas
import usuarioRoutes from "./routes/usuario.js";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "tu secreto aquí",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

//Importando Variables de Entorno
const port = parseInt(process.env.PORT);
const bd_connetion = process.env.BD_CONNETION;
const HOST_MONGO = process.env.HOST_MONGO;

main().catch((err) => console.log(err));
async function main() {
  try {
    const a = await mongoose.connect(`mongodb://${HOST_MONGO}/${bd_connetion}`);
    if (a) {
      console.log("MongoDB is Online,now");
    } else {
      console.log("MongoDB is Offline,now");
    }
  } catch (error) {
    console.error("Error to the connect with MongoDB:", error);
  }
}

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.get("/", (req, res) => {
  res.send("Bienvenido a la Api de la pizzeria");
});

//Usando Rutas
app.use("/usuario", usuarioRoutes);

export default app;
