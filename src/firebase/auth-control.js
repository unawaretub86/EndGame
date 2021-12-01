import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import firebaseConfig from './api-config';



initializeApp(firebaseConfig);

const auth = getAuth();
const authProvider = new GoogleAuthProvider();

export const crearUsuario = async (email, password, nameIn) => {
  try {
    const credencialesUsuario = await createUserWithEmailAndPassword(auth, email, password)
    const user = {
      uid: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email,
      name: nameIn,
      role: 'espera'
    }
    // algo con la DDBB  -   await guardarDatabase('userList', user)
    return user
  } catch (e) {
    return undefined;
  }
}

export const googleCreate = async () => {
  try {
    const credencialesUsuario = await signInWithPopup(auth, authProvider);
    const user = {
      uid: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email,
      name: credencialesUsuario.user.displayName,
      role: 'espera'
    }
    // Guardar datos completos en la DDBB  -  await guardarDatabase('userList', user)
    return user
  } catch (e) {
    return undefined;
  }
}

// Login Usuarios
export const loginUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await signInWithEmailAndPassword(auth, email, password)
    const user = {
      uid: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email
    }
    //  traer datos de la DDBB   -   user =  await consultarDatabaseWhere('userList', 'uid', user.uid);
    return user[0];
  } catch (e) {
    return undefined;
  }
}

export const googleLogin = async () => {
  try {
    const userCredentials = await signInWithPopup(auth, authProvider);

    console.log('User luego de Google  ~~',userCredentials);
    const user = {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email
    }
    console.log('User luego de Filtrar Google  ~~',user);
    // traer data de la DDBB    -    user =  await consultarDatabaseWhere('userList', 'uid', user.uid);
    return user[0];
  } catch (e) {
    return undefined;
  }
}

// LogOut -> salir
export const logOutUsuario = () => {
  const respuesta = signOut(auth)
  console.log(respuesta);
  console.log('Me sali...!');
}

//  datos usuario
export const datosUsuario = async () => {
  const user = auth.currentUser
  console.log('justo al auth.currentUser', auth, user);
  if (user) {
    console.log('en datos user ~',user);
    return user;
  }
  console.log('datos usuario:', user);
  return undefined
}


// el.addEventListener('click', function)
// Usuario Activo
onAuthStateChanged(auth, async (user) => {

  if (user) {
    // const userData = await consultarDatabaseWhere('userList', 'uid', user.uid);
    // const globalUser = userData[0];
    // console.log('state - El usuario está logueado', globalUser);
    // return globalUser;
  }
  console.log('No hay usuario logeado');
  return null;
})

export default { crearUsuario, loginUsuario, logOutUsuario, datosUsuario, googleCreate, googleLogin }