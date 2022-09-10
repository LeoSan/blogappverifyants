import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// Initialize Firebase

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

  async create(data) {
    return [{id:1,name:'Peras', precio:50.5, description:'Peras sin manzanas'}];
  }

  async registro(data) {
    const app = initializeApp(this.firebaseConfig);
    //const analytics = getAnalytics(app);
    const auth = getAuth();

    let respuesta =  createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        //console.log("Entro->",userCredential.user);
        return  userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.table('Error->',errorCode,errorMessage);
        return errorMessage;
      });

    return respuesta;
  }

}

module.exports = UserServices;
