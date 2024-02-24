import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1BrScms7O7E9RS0h0poSj7Jle7_EOcak",
  authDomain: "gfront-338f1.firebaseapp.com",
  projectId: "gfront-338f1",
  storageBucket: "gfront-338f1.appspot.com",
  messagingSenderId: "190133273688",
  appId: "1:190133273688:web:0944a19522b6646d67b62d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { 
    storage
}