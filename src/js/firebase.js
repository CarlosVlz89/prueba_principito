import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase obtenida de la consola
const firebaseConfig = {
  apiKey: "AIzaSyDlVsWGDSSNS95W6EbuLD1VxetaG4wk1qc",
  authDomain: "principito-b5fe3.firebaseapp.com",
  projectId: "principito-b5fe3",
  storageBucket: "principito-b5fe3.firebasestorage.app",
  messagingSenderId: "834077494183",
  appId: "1:834077494183:web:b5285e7c78969a675c0482"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y exportar la base de datos
export const db = getFirestore(app);
