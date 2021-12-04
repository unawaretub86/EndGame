// ----------------------------------------------------------------------
// import { useAuth0 } from '@auth0/auth0-react';
import { datosUsuario } from "../firebase/auth-control";

// afrp - intento por cargar un dato de la base de datos en el nombre >>>
const account = async () => {
  const { email, uid } = await datosUsuario();
  return {
  displayName: uid,
  email,
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
  };
};

export default account;

// afrp- original >>>
// const account = {
//   displayName: 'Vivian Mejia',
//   email: 'vivian@mail.cc',
//   photoURL: '/static/mock-images/avatars/avatar_default.jpg'
// };