const express = require('express');
var router  = express.Router();
const { request, response } = require('express');

//Importo Router
const userRouter     = require('./userRouter');


//Importo Services
const UserServices = require('./userServices');
const userServices = new UserServices();

function routerApi(app){

    //Esto es para versionar nuestra API
    const router  = express.Router();
    app.use('/api/v1', router);

    //http://localhost:5500/api/v1/user/registro

    //Api Para usuarios
    router.use('/user', userRouter);

  }

  module.exports = routerApi;
