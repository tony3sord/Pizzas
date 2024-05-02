import express from "express";
const router = express.Router();
import Producto from "../models/producto";

router.get("", async (req, res) => {
  //   if (req.isAuthenticated()) {
  //   }
  //   return res.status(403).send("Se necesita autenticarse");
  const productos = await Producto.find();
  return res.status(200).json(productos);
});

router.get(":id", async (req, res) => {
  const { id } = req.params;
  //   if (req.isAuthenticated()) {
  //   }
  //   return res.status(403).send("Se necesita autenticarse");
  const producto = await Producto.findById(id);
  return res.status(200).json(producto);
});

router.post("", async (req, res) => {
  const { nombre, descripcion, categoria, cantidad, precio_costo } = req.body;
  try {
    //   if (req.isAuthenticated()) {
    //     if (req.user.rol == "Administrador") {
    //     } else {
    //       return res.status(403).send("No tiene permisos para acceder");
    //     }
    //   }
    //   return res.status(403).send("Se necesita autenticarse");
    const newProducto = new Producto({
      nombre,
      descripcion,
      categoria,
      cantidad,
      precio_costo,
    });
    await Producto.create(newProducto);
    return res.status(200).send("Producto insertado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
});

router.patch(":id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, categoria, cantidad, precio_costo } = req.body;
  try {
    //   if (req.isAuthenticated()) {
    //     if (req.user.rol == "Administrador") {
    //     } else {
    //       return res.status(403).send("No tiene permisos para acceder");
    //     }
    //   }
    //   return res.status(403).send("Se necesita autenticarse");
    const newProducto = new Producto({
      nombre,
      descripcion,
      categoria,
      cantidad,
      precio_costo,
    });
    const a = await Producto.findByIdAndUpdate(id, newProducto);
    if (a) {
      return res.status(200).send("Producto insertado correctamente");
    }
    return res.status(400).send("Fallo de la insercion del producto");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
});

router.delete(":id", async (req, res) => {
  const { id } = req.params;
  try {
    //   if (req.isAuthenticated()) {
    //     if (req.user.rol == "Administrador") {
    //     } else {
    //       return res.status(403).send("No tiene permisos para acceder");
    //     }
    //   }
    //   return res.status(403).send("Se necesita autenticarse");
    const a = await Producto.findByIdAndDelete(id);
    if (a) {
      return res.status(200).send("Producto Eliminado correctamente");
    }
    return res.status(400).send("No se pudo eliminar el producto");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
});

export default router;
