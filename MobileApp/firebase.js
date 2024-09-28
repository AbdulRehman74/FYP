import { initializeApp } from 'firebase/app';
import { initializeAuth,getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getStorage } from "firebase/storage";


// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBwoFu5ER54nh617Plm09ba0jQIUGVDA-A",
  authDomain: "fyp2-1a7f9.firebaseapp.com",
  projectId: "fyp2-1a7f9",
  storageBucket: "fyp2-1a7f9.appspot.com",
  messagingSenderId: "404324206078",
  appId: "1:404324206078:web:d26f7c927158e43fcbecaf",
  databaseURL: "https://fyp2-1a7f9-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

let auth;

if (Platform.OS === 'web') {
  // For web, use default browser persistence
  auth = getAuth(app);
} else {
  // For React Native, use AsyncStorage for persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth, storage  };