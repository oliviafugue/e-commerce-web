//// a place to store all firebase related functions ////

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBAXURrkLZ90ZYYW4vc9MRctQXDiEFFQw",
  authDomain: "corwn-ecommerce-db.firebaseapp.com",
  projectId: "corwn-ecommerce-db",
  storageBucket: "corwn-ecommerce-db.appspot.com",
  messagingSenderId: "764195936789",
  appId: "1:764195936789:web:c888eb61daf5485f234c1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// setup Google provider - each app can have more than one provider
const provider = new GoogleAuthProvider(); //new instance
provider.setCustomParameters({
    prompt: 'select_account'
})

// setup auth - each app can only has one authentication method
export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

// setup database
export const db = getFirestore();

// create document in database
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  // create reference - a location in database
  const userDocRef = doc(db, 'users', userAuth.uid) //三个param: database, collection name, special id of the doc

  // use doc reference to read doc
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists()) //return false; collection里还没有这个document

   //if user data does NOT exist - set it up in database-setDoc
   if(!userSnapshot.exists()) {
     const { displayName, email } = userAuth;
     const createdAt = new Date();

     try {
       await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInfo});
     } catch (error) {
       console.log('error creating the user', error.message)
     }
   }

   //if user exists
   return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
 }

 export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
 }