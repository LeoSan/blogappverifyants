//Variables de ENV
const URI_USER = 'http://localhost:5500/api/v1/user/';

//Definición de objetos Modal
let btnInicioSesion = document.getElementById("btnInicioSesion");
let btnIniciarSesion = document.getElementById("btnIniciarSesion");
let btnRegistrarse = document.getElementById("btnRegistrarse");
let btnModalPost = document.getElementById("btnModalPost");
let btnMisPost = document.getElementById("btnMisPost");
let btnUploadFile = document.getElementById("btnUploadFile");

//Definición Objeto Contenedores
let saludoUsuario = document.getElementById("saludoUsuario");
let divBtnInicio = document.getElementById("divBtnInicio");
let contentPosts = document.getElementById("contentPosts");
let divBtnSalir = document.getElementById("divBtnSalir");

//Definición de objetos Botones Acciones
let btnRegistroEmail = document.getElementById("btnRegistroEmail");
let btnInicioEmail = document.getElementById("btnInicioEmail");
let btnRegistroPost = document.getElementById("btnRegistroPost");
let btnSalirSesion = document.getElementById("btnSalirSesion");


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
  if (data.status=='ok'){
    localStorage.setItem('valLogin', data.status );
    localStorage.setItem('email', data.nickname );

    saludoUsuario.innerHTML =`<h4>Hi, <span id="correoUsuario">${data.nickname}</span> </h4>`;
    divBtnInicio.style.visibility = "hidden";
    divBtnSalir.style.visibility = "visible";

    btnModalPost.style.visibility = "visible";
    btnMisPost.style.visibility = "visible";


  }else{
    localStorage.removeItem('valLogin');
    localStorage.removeItem('email');

    divBtnInicio.style.visibility = "visible";
    divBtnSalir.style.visibility = "hidden";

    btnModalPost.style.visibility = "hidden";
    btnMisPost.style.visibility = "hidden";
  }
};

const validaLogin = ()=>{
  const valLogin = localStorage.getItem('valLogin');
  const email = localStorage.getItem('email');

  if(valLogin == 'ok'){
    //Aqui valido
    saludoUsuario.innerHTML =`<h4>Hi, <span id="correoUsuario">${email}</span> </h4>`;
    divBtnInicio.style.visibility = "hidden";
    divBtnSalir.style.visibility = "visible";

    btnModalPost.style.visibility = "visible";
    btnMisPost.style.visibility = "visible";
  }else{
    divBtnInicio.style.visibility = "visible";
    divBtnSalir.style.visibility = "hidden";

    btnModalPost.style.visibility = "hidden";
    btnMisPost.style.visibility = "hidden";
  }
};


function getPost(filtro){
  let postData = {
    autor: localStorage.getItem('email'),
  };

  try {
    fetch(URI_USER+"get-posts",{
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
      body:JSON.stringify(postData)
    }).then((resp) => resp.json())
    .then((data) => {//Recuerda es una promesa y regresa otra promesa por lo que hay que hacerle doble then para optener lo que necesitamos

    if(data.status=='ok'){
      let postHtml = '';
      //console.log(data.datos);
      data.datos.forEach(element => {
        console.log(element.dateExample);
         postHtml += obtenerPostTemplate( element.autor,  element.titulo,  element.descripcion,   element.videoLink,  element.imagenLink,  obtenerFecha(element.dateExample));
      });
      //Join todos los  post
      contentPosts.innerHTML= postHtml;

    }else{
      console.log(data.mensaje);
    }

    }).catch(error=>{
      console.log(error);

    });
  } catch (error) {
    console.log(error);
  }
}

//Definición de Eventos
    window.addEventListener("load", function(){
      validaLogin();
      getPost(false);
    });

    btnInicioSesion.addEventListener("click", (e)=> {
      cerrarModal('modalRegistro');

      var elems  = document.getElementById('modalSesion');
      const instance = M.Modal.init(elems, {dismissible: true});
      instance.open();
    });

    btnIniciarSesion.addEventListener("click", (e)=> {
      cerrarModal('modalRegistro');

      var elems  = document.getElementById('modalSesion');
      const instance = M.Modal.init(elems, {dismissible: true});
      instance.open();
    });

    btnRegistrarse.addEventListener("click", (e)=> {
      cerrarModal('modalSesion');

      var elems  = document.getElementById('modalRegistro');
      const instance = M.Modal.init(elems, {dismissible: true});
      instance.open();
    });

    btnModalPost.addEventListener("click", (e)=> {
      cerrarModal('modalSesion');
      var elems  = document.getElementById('modalPost');
      const instance = M.Modal.init(elems, {dismissible: true});
      instance.open();
    }, true);


  //Evento APIS

    btnRegistroEmail.addEventListener("click", (e)=> {
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

    btnInicioEmail.addEventListener("click", (e)=> {
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
                    //habilito Acciones
                    habilitaNuevasAcciones(data);

                      setTimeout(() => {
                      cerrarModal('modalSesion');
                      }, 3000);
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
    btnSalirSesion.addEventListener("click", (e)=> {
      e.preventDefault();
      localStorage.removeItem('valLogin');
      localStorage.removeItem('email');

      window.location.href ="http://localhost:5500/";
    });

    btnRegistroPost.addEventListener("click", (e)=> {
      e.preventDefault();
      let postData = {
        autor: localStorage.getItem('email'),
        titulo: document.getElementById('tituloNewPost').value,
        descripcion: document.getElementById('descripcionNewPost').value,
        imagenLink: document.getElementById('linkVideoNewPost').value, //'https://stock.adobe.com/mx/collections/gIVeC8c73QvgMdMA455up2poRfeU3bxK?asset_id=311174184',
        videoLink: 'https://stock.adobe.com/mx/collections/gIVeC8c73QvgMdMA455up2poRfeU3bxK?asset_id=311174184',
        file:btnUploadFile.files[0],
      }

      if(postData.titulo === '' || postData.descripcion === '' || postData.imagenLink === '' ){
        toggleMensagge("msjApi","message-success", "message-fall", "Debes llenar los campos por favor.");
        return;
      }
      try {
        fetch(URI_USER+"create-post",{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body:JSON.stringify(postData)
        }).then((resp) => resp.json())
        .then((data) => {//Recuerda es una promesa y regresa otra promesa por lo que hay que hacerle doble then para optener lo que necesitamos

        if(data.status=='ok'){
          console.log(data.datos);
          toggleMensagge("msjApiPost","message-fall", "message-success", "Se registró de manera exitosa.");

          setTimeout(() => {
            //window.location.href ="http://localhost:5500/";
          }, 3000);

        }else{
          console.log(data.mensaje);
          toggleMensagge("msjApiPost","message-success","message-fall", "Hubo un error en la conexión.");
        }

        });
    } catch (error) {
      console.log(error);
      toggleMensagge("msjApiPost","message-success","message-fall", "Hubo un error en la conexión.");
    }
    });


function obtenerPostTemplate (
  autor,
  titulo,
  descripcion,
  videoLink,
  imagenLink,
  fecha
) {
  if (imagenLink ) {
    return `<article class="post">
          <div class="post-titulo">
              <h5>${titulo}</h5>
          </div>
          <div class="post-calificacion">
              <a class="post-estrellita-llena" href="*"></a>
              <a class="post-estrellita-llena" href="*"></a>
              <a class="post-estrellita-llena" href="*"></a>
              <a class="post-estrellita-llena" href="*"></a>
              <a class="post-estrellita-vacia" href="*"></a>
          </div>
          <div class="post-video">
              <img id="imgVideo" src='${imagenLink}' class="post-imagen-video"
                  alt="Imagen Video">
          </div>
          <div class="post-videolink">
              <a href="${videoLink}" target="blank">Ver Video</a>
          </div>
          <div class="post-descripcion">
              <p>${descripcion}</p>
          </div>
          <div class="post-footer container">
              <div class="row">
                  <div class="col m6">
                      Fecha: ${fecha}
                  </div>
                  <div class="col m6">
                      Autor: ${autor}
                  </div>
              </div>
          </div>
      </article>`
  }

  return `<article class="post">
              <div class="post-titulo">
                  <h5>${titulo}</h5>
              </div>
              <div class="post-calificacion">
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-llena" href="*"></a>
                  <a class="post-estrellita-vacia" href="*"></a>
              </div>
              <div class="post-video">
                  <iframe type="text/html" width="500" height="385" src='${videoLink}'
                      frameborder="0"></iframe>
                  </figure>
              </div>
              <div class="post-videolink">
                  Video
              </div>
              <div class="post-descripcion">
                  <p>${descripcion}</p>
              </div>
              <div class="post-footer container">
                  <div class="row">
                      <div class="col m6">
                          Fecha: ${fecha}
                      </div>
                      <div class="col m6">
                          Autor: ${autor}
                      </div>
                  </div>
              </div>
          </article>`
}

function obtenerFecha (timeStamp) {
  const d = new Date(timeStamp);
  console.log("tiempo", d);
  /*let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  */
  //return [day, month, year].join('/');
  return timeStamp;
}









