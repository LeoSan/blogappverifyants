var express = require('express');
var router  = express.Router();
const { request, response } = require('express');

//importo el servicio
const UserServices = require('./userServices');
const service = new UserServices();

//Metodo: Router que conecta con el server valida-login-firebase
router.get('/valida-login',  async (req = request, res = response) => {

    try {
      const valida = await service.validaUserWithEmail();
      res.status(200).json({status:'ok', valida:valida});
    } catch (error) {
      console.log(error);
      res.status(404).json({status:'bad',"mensaje":error});

    }

});

//Metodo: Router que conecta con el server login-firebase
router.post('/login',  async (req = request, res = response, next) => {
    const body = req.body;
    try {
      const user = await service.signInWithEmail(body);
      res.status(200).json({status:'ok', nickname:user.email});
    } catch (error) {
      res.status(404).json({status:'bad',"mensaje":error});
      //next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
    //next(); // se utiliza para que se ejecute el router.get
});


//Metodo: Router que conecta con el server registro-firebase
router.post('/registro',  async (req = request, res = response, next) => {

  const body = req.body;
  try {
      const user = await service.createUserWithEmail(body);
      res.status(200).json({status:'ok', user});
    } catch (error) {
      res.status(404).json({status:'bad',"mensaje":error});
      //next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
    //next(); // se utiliza para que se ejecute el router.get
});

//Metodo: Router que conecta con el server con la Coleccion Post ACCESO A BASE DATOS
//Deuda Tecnica: como es un proyecto pequeño este metodo deberia estar en una clase aparte dedicada a manejar los posts
router.post('/get-posts',  async (req = request, res = response, next) => {

  const body = req.body;
  try {
      const posts = await service.getPosts(body);
      res.status(200).json({status:'ok', datos:posts});
    } catch (error) {
      res.status(404).json({status:'bad', "mensaje":error});
      //next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
    //next(); // se utiliza para que se ejecute el router.get
});

//Metodo: Router que conecta con el server e inserta un valor en algun documento.
//Deuda Tecnica: como es un proyecto pequeño este metodo deberia estar en una clase aparte dedicada a manejar los posts
router.post('/create-post',  async (req = request, res = response, next) => {

  const body = req.body;
  try {
      const posts = await service.createPost(body);
      res.status(200).json({status:'ok', datos:posts});
    } catch (error) {
      res.status(404).json({status:'bad', "mensaje":error});
      //next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
    //next(); // se utiliza para que se ejecute el router.get
});

//Metodo: Router que conecta con el server e inserta un valor en algun documento.
//Deuda Tecnica: como es un proyecto pequeño este metodo deberia estar en una clase aparte dedicada a manejar los posts
router.post('/upload',  async (req = request, res = response, next) => {

  const body = req.files;
  console.log("body",body);

  try {
      const upload = await service.uploadStorage(body);
      res.status(200).json({status:'ok', datos:upload});
    } catch (error) {
      res.status(404).json({status:'bad', "mensaje":error});

    }

});

module.exports = router;
