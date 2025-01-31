import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBUe97KS4Y5_LkPu0m4gPIU9052zWYPLPI",
  authDomain: "matt-ia-auth.firebaseapp.com",
  projectId: "matt-ia-auth",
  storageBucket: "matt-ia-auth.firebasestorage.app",
  messagingSenderId: "933656423053",
  appId: "1:933656423053:web:9b756a56cef0d869d290c4"
};

const app = initializeApp(firebaseConfig);

export default app;
