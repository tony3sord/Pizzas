import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema(
  {
    nombre: String,
    descripcion: String,
    categoria: {
      type: String,
      enum: ["Ingrediente", "Bebida", "Pizza", "Pan"],
    },
    cantidad: Number,
    precio_costo: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Producto", ProductoSchema);
