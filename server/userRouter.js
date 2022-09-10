

var express = require('express');
var router  = express.Router();
const { request, response } = require('express');

//importo el servicio
const UserServices = require('./userServices');
const service = new UserServices();


// middleware específico a este router
router.get('/create',  async (req = request, res = response, next) => {
    try {
      const user = await service.create();
      res.status(200).json(user);
    } catch (error) {
      //next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
    //next(); // se utiliza para que se ejecute el router.get
});


router.post('/registro',  async (req = request, res = response, next) => {

  const body = req.body;
  try {
      const user = await service.registro(body);
      res.status(200).json({status:'ok', user});
    } catch (error) {
      res.status(404).json({"mensaje Error->":error});
      //next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
    //next(); // se utiliza para que se ejecute el router.get
});

module.exports = router;
