const { request, response } = require('express');
const colors      = require('colors');
const express     = require("express");
const cors        = require('cors');

//Importo los router
const routerApi = require('./routers');


//Clase Server
class Server {

    constructor(){
      this.app = express(),
      this.port  = 5500,
      this.seguridad  = '',
      this.whitelist = ['http://localhost:5500/', 'https://blogappverifyants.firebaseapp.com/'], //damos permiso solo a estas direcciones
      this.optionCors = {
        'Access-Control-Allow-Origin':'https://blogappverifyants.firebaseapp.com/' //Si Funciona con esto
      },

      //rutas de aplicación
      this.routes(),
      //midlewares (van siempre despues del router)
      this.midlewares()
    }

    routes(){
      //Habilitar leer los valores de un body del raw -> Esta manera es de enviar json a los apis
      this.app.use(express.json());

      //Forma mas estructurada para usar los router
      routerApi(this.app);

      //En caso que llegue a la raiz
      this.app.get("/", (req = request, res = response) =>{
        res.send("Hola mi server en Express");
      });


      //Habilito el uso de cors-> Debe ir de ultimo luego de la carga de los endpoints
      this.app.use(cors(this.optionCors));//npm i cors
    }//fin del metodo routes

    midlewares(){

     // this.app.use(logErrors);
     // this.app.use(errorHandler);
    }

    listen(){
      //Iniciamos nuestro  servidor
      this.app.listen(this.port, '0.0.0.0', () => {

        console.log(`${'!!  Servidor Operando !!'.rainbow} ${ '<-|°.°|->  Puerto: '.green} -> ${this.port}`);

    });

    }
}

module.exports = Server;
