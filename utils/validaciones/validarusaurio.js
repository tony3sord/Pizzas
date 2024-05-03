import Usuario from "../../models/usuario.js";

const validar = async (usuario, correo) => {
  const validate_email = await Usuario.findOne({ correo });
  const validate_user = await Usuario.findOne({ usuario });
  if (validate_email || validate_user) {
    return true;
  }
};

export default validar;
