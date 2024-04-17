import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAFSKTW9F9FO66_Z4Eg3552MGYGADqPKU",
  authDomain: "meu-controlo-financeiro.firebaseapp.com",
  projectId: "meu-controlo-financeiro",
  storageBucket: "meu-controlo-financeiro.appspot.com",
  messagingSenderId: "608997092473",
  appId: "1:608997092473:web:507f5cf1533bbc6ca0f8a8",
  measurementId: "G-45KSM1P4WH",
  // storageBucket: 'gs://meu-controlo-financeiro.appspot.com/',
};

const app = initializeApp(firebaseConfig);

const localStorage = getReactNativePersistence(ReactNativeAsyncStorage);

initializeAuth(app, {
  persistence: localStorage
});

const firestore = getFirestore(app);

const storage = getStorage(app);

export { 
  firestore,
  storage
};
