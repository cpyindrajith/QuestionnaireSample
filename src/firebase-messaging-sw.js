importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDEOuBjzb5PT877B2O1J5TpV7_mh6LJPfk",
    authDomain: "sampleapp-74465.firebaseapp.com",
    projectId: "sampleapp-74465",
    storageBucket: "sampleapp-74465.appspot.com",
    messagingSenderId: "848364266876",
    appId: "1:848364266876:web:3e80e716ba37985692f0f9",
    measurementId: "G-28B61VXNXH"
});
const messaging = firebase.messaging();