import Producto from "../../models/producto.js";

const validar = async (nombre) => {
  const producto = await Producto.Producto({ nombre });
  if (producto) {
    return producto;
  }
  return false;
};

export default validar;
