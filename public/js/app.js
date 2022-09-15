//Variables de ENV
const URI_USER = 'http://localhost:5500/api/v1/user/';

//Definición de objetos Modal
let btnInicioSesion = document.getElementById("btnInicioSesion");
let btnIniciarSesion = document.getElementById("btnIniciarSesion");
let btnRegistrarse = document.getElementById("btnRegistrarse");
let btnModalPost = document.getElementById("btnModalPost");
let btnMisPost = document.getElementById("btnMisPost");
let saludoUsuario = document.getElementById("saludoUsuario");
let divBtnInicio = document.getElementById("divBtnInicio");


//Definición de objetos Botones Acciones
let btnRegistroEmail = document.getElementById("btnRegistroEmail");
let btnInicioEmail = document.getElementById("btnInicioEmail");


//Definición de Metodos

const cerrarModal=(nombreModal)=>{
  var elems  = document.getElementById(nombreModal);
  const instance = M.Modal.init(elems, {dismissible: true});
  instance.close();
};

const toggleMensagge =(id, remove, add, msg)=>{
  document.getElementById(id).classList.remove(remove);
  document.getElementById(id).classList.add(add);
  document.getElementById(id).innerHTML = `!${msg}!`;
};

const habilitaNuevasAcciones =(data)=>{
  let acciones='';
  if (data.status=='ok'){
    acciones +=`<li><a id="btnMisPost">Mis Posts</a></li>`;
    acciones +=`<li><a id="btnModalPost">Realiza un Post</a></li>`;
    acciones +=`<li><a id="btnTodoPost">Todos los Posts</a></li>`;
    //acciones +=`<li><a href="index.html#footer">Contactenos</a></li>`;
    divBtnInicio.style.visibility = "hidden";
    saludoUsuario.innerHTML =`<h4>Hi, <span id="correoUsuario">${data.nickname}</span> , Bienvenid@ </h4>`;
  }else{
    acciones +=`<li><a id="btnTodoPost">Todos los Posts</a></li>`;
    acciones +=`<li><a href="index.html#footer">Contactenos</a></li>`;
    divBtnInicio.style.visibility = "visible";
  }
  return acciones;
};

//Definición de Eventos

window.addEventListener("load", function(){
  //get-Posts

  let postData = {
    //uid: ,
    autor: 'cuenca623@gmail.com',
    titulo: 'Organiza y evalua',
    descripcion: 'Organiza y evalua',
    imagenLink: 'https://stock.adobe.com/mx/collections/gIVeC8c73QvgMdMA455up2poRfeU3bxK?asset_id=311174184',
    videoLink: 'https://stock.adobe.com/mx/collections/gIVeC8c73QvgMdMA455up2poRfeU3bxK?asset_id=311174184',
    fecha: '2022-09-15'
}


  try {
    //fetch(URI_USER+"create-post",{
    fetch(URI_USER+"get-posts",{
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
      body:JSON.stringify(postData)
    }).then((resp) => resp.json())
    .then((data) => {//Recuerda es una promesa y regresa otra promesa por lo que hay que hacerle doble then para optener lo que necesitamos

    if(data.status=='ok'){
      console.log(data.datos);

    }else{
      console.log(data.mensaje);
    }

    }).catch(error=>{
      console.log(error);

    });
} catch (error) {
  console.log(error);

}



});


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

  if (btnModalPost){
    btnModalPost.addEventListener("click", function () {
      cerrarModal('modalSesion');

      var elems  = document.getElementById('modalPost');
      const instance = M.Modal.init(elems, {dismissible: true});
      instance.open();
    });
  }

  if (btnMisPost){
    btnMisPost.addEventListener("click", function () {
      console.log("consulto mis opost usando firebase ");

    });
  }


  btnRegistroEmail.addEventListener("click", function () {
    var data ={
      nombre:document.getElementById('nombreContactoReg').value,
      email:document.getElementById('emailContactoReg').value,
      password:document.getElementById('passwordReg').value
    };


    if(data.email == '' || data.password == '' ){
      toggleMensagge("msjApiRegistro","message-success", "message-fall", "Debes llenar los campos por favor.");
      return;
    }

    try {
        fetch(URI_USER+"registro",{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body:JSON.stringify(data)
        }).then((resp) => resp.json())
        .then((data) => {//Recuerda es una promesa y regresa otra promesa por lo que hay que hacerle doble then para optener lo que necesitamos

        if(data.status=='ok'){
            toggleMensagge("msjApiRegistro","message-fall", "message-success", "Se registró de manera exitosa, ahora inicia sesión con tu cuenta.");
            document.getElementById('nombreContactoReg').value="",
            document.getElementById('emailContactoReg').value="",
            document.getElementById('passwordReg').value="";
          }else{
            toggleMensagge("msjApiRegistro","message-success","message-fall", "Hubo un error en la conexión.");
          }

        }).catch(error=>{
          toggleMensagge("msjApiRegistro","message-success","message-fall", "Hubo un error en la conexión.");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      toggleMensagge("msjApiRegistro","message-success","message-fall", "Hubo un error en la conexión.");
    }

  });

  btnInicioEmail.addEventListener("click", function () {
    var data ={
      email:document.getElementById('emailSesion').value,
      password:document.getElementById('passwordSesion').value
    };


    if(data.email == '' || data.password == '' ){
      toggleMensagge("msjApi","message-success", "message-fall", "Debes llenar los campos por favor.");
      return;
    }

    try {
            fetch(URI_USER+"login",{
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
              },
              body:JSON.stringify(data)
            }).then((resp) => resp.json())
            .then((data) => {

              if(data.status=='ok'){
                  toggleMensagge("msjApi","message-fall", "message-success", "Inicio de sesión correcto, ahora podras postear y ver tus post.");
                  document.getElementById('emailSesion').value="",
                  document.getElementById('passwordSesion').value="";

                  document.getElementById("menuAccion").innerHTML = habilitaNuevasAcciones(data);

                    setTimeout(() => {
                    cerrarModal('modalSesion');
                    }, 5000);
                }else{
                  toggleMensagge("msjApi","message-success","message-fall", "Hubo un error en la conexión.");
                }
            }).catch(error=>{
              toggleMensagge("msjApi","message-success","message-fall", "Hubo un error en la conexión.");
              console.log("catch", error);
            });
    } catch (error) {
      console.log(error);
      toggleMensagge("msjApi","message-success","message-fall", "Hubo un error en la conexión.");
    }



  });









