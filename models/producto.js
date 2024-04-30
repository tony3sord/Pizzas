import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema(
  {
    nombre: String,
    precio: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Producto", ProductoSchema);
