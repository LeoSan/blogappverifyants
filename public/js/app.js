
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

const toggleMensagge =(remove, add, msg)=>{
  document.getElementById("msjApi").classList.remove(remove);
  document.getElementById("msjApi").classList.add(add);
  document.getElementById("msjApi").innerHTML = `!${msg}!`;
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
  };


  if(data.email == '' || data.password == '' ){
    toggleMensagge("message-success", "message-fall", "Debes llenar los campos por favor.");
    return;
  }

  try {
      fetch(URI_REGISTRO,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    }).then(resp=>{
      if(resp.status=='200'){
          toggleMensagge("message-fall", "message-success", "Se registró de manera exitosa, ahora inicia sesión con tu cuenta.");
          document.getElementById('nombreContactoReg').value="",
          document.getElementById('emailContactoReg').value="",
          document.getElementById('passwordReg').value="";
        }else{
          toggleMensagge("message-success","message-fall", "Hubo un error en la conexión.");
        }
      }).catch(error=>{
        toggleMensagge("message-success","message-fall", "Hubo un error en la conexión.");
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    toggleMensagge("message-success","message-fall", "Hubo un error en la conexión.");
  }


});







