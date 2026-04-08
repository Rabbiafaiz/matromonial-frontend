// public/firebase-messaging-sw.js
// importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging.js");

importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyBN9AGlir29d99N6IvQfwBIjfRn2z6KCo8",
    authDomain: "vaishakhi-matrimony.firebaseapp.com",
    projectId: "vaishakhi-matrimony",
    storageBucket: "vaishakhi-matrimony.appspot.com",
    messagingSenderId: "530738306887",
    appId: "1:530738306887:web:ab02612f31302eb2733662",
    measurementId: "G-ES21NYQFW4"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});