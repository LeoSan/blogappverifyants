importScripts("https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.3/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAZW2LGFSZaT49Wbi3M27kutAqWu7pstUg",
    authDomain: "blogappverifyants.firebaseapp.com",
    projectId: "blogappverifyants",
    storageBucket: "blogappverifyants.appspot.com",
    messagingSenderId: "554281093343",
    appId: "1:554281093343:web:2ae260b6eb6e13ab76816a",
    measurementId: "G-8RCTMFCZRC"
  });


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });


firebase.messaging().setBackgroundMessageHandler((result) => {
    console.log("background ",result);
})
