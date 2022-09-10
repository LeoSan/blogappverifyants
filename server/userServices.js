// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


class UserServices {

  constructor(){
    this.firebaseConfig = {
      apiKey: "AIzaSyAZW2LGFSZaT49Wbi3M27kutAqWu7pstUg",
      authDomain: "blogappverifyants.firebaseapp.com",
      projectId: "blogappverifyants",
      storageBucket: "blogappverifyants.appspot.com",
      messagingSenderId: "554281093343",
      appId: "1:554281093343:web:2ae260b6eb6e13ab76816a",
      measurementId: "G-8RCTMFCZRC"
    };
    //this.generate();
  }

  //Servicio-Firebase: Para login en Firebase
  async signInWithEmail(data) {
    const app = initializeApp(this.firebaseConfig);
    const auth = getAuth();
    let respuesta;

    //Es una promesa
    respuesta = signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
    return respuesta;
  }

  //Servicio-Firebase: Para registrar Usuarios en Firebase
  async createUserWithEmail(data) {
    const app = initializeApp(this.firebaseConfig);
    //const analytics = getAnalytics(app);
    const auth = getAuth();

    let respuesta =  createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        return  userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorMessage;
      });

    return respuesta;
  }

  //Servicio-Firebase: Es un escuchador si el usuario no ha cambiado de estado podemos saberlo con esto
  async validaUserWithEmail() {
    const app = initializeApp(this.firebaseConfig);
    //const analytics = getAnalytics(app);
    const auth = getAuth();

    auth.onAuthStateChanged((user)=>{
      console.log("user", user);
      if (user != null) {
        return {status:'ok', user:user};
      }else{
        return {status:'bad', user:null};
      }
    });


  }

}

module.exports = UserServices;
