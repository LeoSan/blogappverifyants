
//Variables de ENV
const URI_REGISTRO = 'http://localhost:5500/api/v1/user/registro';

//Definición de objetos Modal
let btnInicioSesion = document.getElementById("btnInicioSesion");
let btnIniciarSesion = document.getElementById("btnIniciarSesion");
let btnRegistrarse = document.getElementById("btnRegistrarse");
let btnModalPost = document.getElementById("btnModalPost");


//Definición de objetos Botones Acciones
let btnRegistroEmail = document.getElementById("btnRegistroEmail");


//Definición de Metodos

const cerrarModal=(nombreModal)=>{
  var elems  = document.getElementById(nombreModal);
  const instance = M.Modal.init(elems, {dismissible: true});
  instance.close();
};


//Definición de Eventos
btnInicioSesion.addEventListener("click", function () {
  cerrarModal('modalRegistro');

  var elems  = document.getElementById('modalSesion');
  const instance = M.Modal.init(elems, {dismissible: true});
  instance.open();
});

btnIniciarSesion.addEventListener("click", function () {
  cerrarModal('modalRegistro');

  var elems  = document.getElementById('modalSesion');
  const instance = M.Modal.init(elems, {dismissible: true});
  instance.open();
});

btnRegistrarse.addEventListener("click", function () {
  cerrarModal('modalSesion');

  var elems  = document.getElementById('modalRegistro');
  const instance = M.Modal.init(elems, {dismissible: true});
  instance.open();
});


btnModalPost.addEventListener("click", function () {
  cerrarModal('modalSesion');

  var elems  = document.getElementById('modalPost');
  const instance = M.Modal.init(elems, {dismissible: true});
  instance.open();
});


btnRegistroEmail.addEventListener("click", function () {


  var data ={
    nombre:document.getElementById('nombreContactoReg').value,
    email:document.getElementById('emailContactoReg').value,
    password:document.getElementById('passwordReg').value
  }

  fetch(URI_REGISTRO,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data)
}).then(resp=>{
    resp.json();

  }).catch(error=>{

    console.log(error);

  });


});







