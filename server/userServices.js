// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes } from "firebase/storage";



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

  //Servicio-Firebase: Me Permite conectar y conultar un Documento dentro de la base de datos de Firebase
  //Deuda Técnica: como es un proyecto pequeño este metodo deberia estar en una clase aparte dedicada a manejar los posts
  async getPosts() {
    const app = initializeApp(this.firebaseConfig);
    const db = getFirestore(app);
    //const settings = { timestampsInSnapshots : true}
    //db.settings(settings);
    const postsCol = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCol);
    const postsList = postsSnapshot.docs.map(doc => doc.data());
    return postsList;
  }


//Servicio-Firebase: Me Permite conectar y conultar un Documento dentro de la base de datos de Firebase
  //Deuda Técnica: como es un proyecto pequeño este metodo deberia estar en una clase aparte dedicada a manejar los posts
  async createPost(postData) {

    const data = {
      ... postData,
      dateExample: Timestamp.fromDate(new Date()),
    }


    console.log("data Create",data);

    return false;


    const app = initializeApp(this.firebaseConfig);
    const db = getFirestore(app);
    const postsRef = doc(collection(db, "posts"));
    const resp =  await setDoc(postsRef, data).then(resp=>{


    //Subir archivos
    const storage = getStorage();
    const storageRef = ref(storage, 'images');

    // 'file' comes from the Blob or File API
    const file = uploadBytes(storageRef, data.file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    console.log("data Create",file);

    return resp;

    }).catch(err=>{
      return err;
    });

    return resp;
  }


}//Fin de la clase

module.exports = UserServices;
