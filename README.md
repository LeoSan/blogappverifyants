# blogappverifyants
```Curso de Firebase,  Para este caso usare este conocimiento para crearun blog de enseñar a la personas como administrar sus recursos.```

# 05 - Curso de Firebase 5 para Web

## Clase 1: Bienvenida 
- Profesor Juan Guillermo Gómez Torres

## Clase 2 : ¿Qué es Firebase?

**Firebase** 
> Es un Backend como Servicio, es decir, esta herramienta nos permite conectarnos desde cualquier aplicación a las tareas de backend y despliegue de nuestras aplicaciones de forma mucho más simple, mantenible y escalable.

> Tareas como crear y autenticar usuarios, guardar nuestra información en bases de datos, almacenar archivos estáticos, administrar la infraestructura, analizar métricas, entre muchas otras. Gracias a Firebase automatizamos y agilizamos todos estos servicios en una misma plataforma integrada sobre la infraestructura de Google Cloud.

**Servicios de Firebase para la Web:**

- Cloud Firestore: Almacenamiento y sincronización de los datos de nuestra aplicación a escala global, funciona como una base de datos NoSQL.
- Autenticación: Autenticación de usuarios de manera simple, rápida y segura con email y contraseña, redes sociales o mensajes de texto.
- Cloud Storage: Almacenar y atender nuestros archivos (imágenes, vídeos, etc) a la escala de Google.
- Cloud Messaging: Envío de mensajes y notificaciones segmentadas.
- Hosting: El sistema de Google Cloud para almacenar la información de nuestra página web.
- Cloud Functions: Administración del código de backend necesario para desplegar nuestras aplicaciones a los servidores de Google Cloud.
- Integraciones: Podemos conectar las funciones de Firebase a otros servicios de Google (Google Ads, Google Marketing Platform, entre otras) o incluso a servicios de terceros como Slack, Data Studio y BigQuery.


https://platzi.com/tutoriales/1435-firebase-web/8710-instala-y-corre-el-proyecto-del-curso-en-tu-computadora-sin-problemas/

## Clase 3: El proyecto que crearás PILOTO 

**Iniciando Proyecto**

- Paso 1: Entramos al enlace pero previamente debemos logearnos como ya yo tengo una cuenta google ya se me facilita un poco, pero aqui debes de tener una cuenta activa de gooogle. 

**Inicio**
![InicioProyecto_0001](info/InicioProyecto_0001.png)

- Paso 2: Clic en Crear 
  - Debes crear un proyecto con el nombreUnico de tu proyecto, al mismo tiempo nos da un identificador unico del proyecto. a parte de colocar el nombre debeos hablar con nuestro cliente o no si deseamos usar el google Analytic para medir datos entre otras funciones que te da google, para este caso pues es uso propio le vamos a decir que si para ver como se mueve nuestro proyecto en el mundo. 

**Inicio**
![InicioProyecto_0002](info/InicioProyecto_0002.png)
![InicioProyecto_0003](info/InicioProyecto_0003.png)

    - Elegimos en que cuenta de google queremos el proyecto 
![InicioProyecto_0003](info/InicioProyecto_0004.png)
    - Esperamos hasta que el proyecto se genere 
![InicioProyecto_0003](info/InicioProyecto_0005.png)
    - Aqui terminamos el paso 2, se genera el proyecto y nos muestra el panel 
![InicioProyecto_0003](info/InicioProyecto_0006.png)
    - Aqui determinamos el plan en este caso es el gratuito llamado spark 
![InicioProyecto_0003](info/InicioProyecto_0007.png)


## Clase 4: Consola de administración  Explicación 

> Configuración del proyecto. 
**Como podemos ver los datos del proyecto**
- Aqui vemos los datos del proyecto 
![InicioProyecto_0003](info/InicioProyecto_0008.png)

- aqui podemos generar un Apu publica para que puedan usar 
![InicioProyecto_0003](info/InicioProyecto_0009.png)

- aqui podemos ingresar los usuarios para que puedan colaborar en el proyecto 
![InicioProyecto_0003](info/InicioProyecto_0010.png)


**Nota**
- La ubicación de los servidores NO se puede cambiar después de crear el proyecto
- Aunque normalmente Firebase se usa en el frontend también puede usarse en el backend.
- Existen SDK para Nodejs, Java, Python y Go. (existen librerías de terceros para otros lenguajes creadas por las diferentes comunidades)
- En la versión de Firebase actual (Junio 17 de 2021) el campo de la “Clave de API de la web” es creado sin valor alguno.


## Clase 5: Configuración de Firebase en el proyecto

- Paso 1: Seguimos los pasos que nos indica el generador de proyecto. 
  - Damos clic sobre el icono, es importante resaltar que esta guia cambia durante el tiempo  
  - ![Paso1](info/PasosProyecto_0001.png)

- Paso 2: Seguimos como un wizard los pasos para poder conectar nuestro código con firebase 
  - ![Paso2](info/PasosProyecto_0002.png)

- Paso 3: Como lo indica la imagen instalamos `npm install firebase` y creamos en nuestro directorio js `config/ConfigFirebase.js` aqui pegamos el código que nos indica el wizard de google luego vamos a nuestro archivo index.hmtml y lo anexamos para lograr la conexicón con firebase
  - ![Paso3](info/PasosProyecto_0003.png)

- Paso 4: Seguimos con el wizard en este caso debemos instalar el Instala Firebase CLI `npm install -g firebase-tools`  

  - ![Paso3](info/PasosProyecto_0004.png)
- Paso 5: Ya como  ultimo paso, podemos iniciar nuestro proyecto web en firebase pero previamente debemos tener nuestro proyecto en nuestro github de manera unica y limpia ya que usa Github como base para poder copiar ese repo en firebase y los cambios que subas en github de manera automatica los toma firebase. **Nota** debes correr estos comando en consola de `windows o de github`  
 - ![Paso3](info/PasosProyecto_0005.png)
 - ![Paso3](info/PasosProyecto_0006.png)
  

**Nota**
- Esta primera instalación se pasaron de mamones
  - Primero necesitas pasar tu cuenta a `Blaze`
  - Segundo si usas el comando de `firebase init` y `firebase deploy` a fuerza necesitas configurar la EL COMPONENTE `funtions` para esto pues debes leer bien la guia y usar bien el tutorial ya que el firebase init te permite paso a paso realizar un dummy pero hay detalles primero DEBES CREAR EL DIRECTORIO `funtions/index.ts` extension se usa `TS`
 
 > Todo esto es para levantar un proyecto pero con esto si creaste ya tu proyecto en Github al menos el cascaton lo puedes ver ya enlinea con el componenete HOSTING QUE tiene Google Firebase 

 ## Clase 6: Servicios de autenticación y configuración de usuarios

> Firebase nos proporciona una configuración muy sencilla para manejar la creación de usuarios, inicio de sesión y logout de la aplicación con email y password o con redes sociales (Google Accounts, Facebook, Twitter, Github o incluso nuestros proveedores personalizados).

>Firebase nos proporciona SDKs (Software Development Kits) para facilitar la programación y configuración de estas funcionalidades en los lenguajes y plataformas más comunes, en caso de no encontrar estas librerías oficiales podemos encontrar diferentes herramientas creadas por la comunidad. Tambien tenemos acceso y control muy personalizado de toda esta información gracias a la Consola de Firebase.

> Gracias al servicio de autenticación de usuarios de Firebase podemos ahorrar mucho tiempo programando estas mismas funcionalidades por nuestra cuenta.

**Como**
- Paso 1: Debemos entrar a nuestra consola y habilitar el componenete `Autentication`
  - ![Auto](info/Autentication_0007.png)
  - Escogemos correo y contraseña la cual usaremos 
  - ![Auto](info/Autentication_0008.png)
  - Luego de validar e iniciar en `Consola` que vamos usar `Autentication` debemos ir al script 
  
- Paso 2:   