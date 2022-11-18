import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDoKXLyEU3foIDsO6697apv2xRS7BMnhc",
  authDomain: "crown-clothing-db-c4d76.firebaseapp.com",
  projectId: "crown-clothing-db-c4d76",
  storageBucket: "crown-clothing-db-c4d76.appspot.com",
  messagingSenderId: "483539488097",
  appId: "1:483539488097:web:78ba3669b4cd88f59c0920"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const Googleprovider = new GoogleAuthProvider();

Googleprovider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, Googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, Googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error, 'error creating the user')
    }
  }

  return userDocRef;
  // if user data exists,
  // return user doc ref, do nothing
  // if user data does not exist,
  // set data into the 
} 