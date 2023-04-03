//// a place to store all firebase related functions ////

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


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
});

// setup auth - each app can only has one authentication method
export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

// setup database
export const db = getFirestore();

//use collection and writeBatch add objects in shop-data to firebase db, 2 params: collection name, data
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { 
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); //2 params: collection reference/name, doc/category name
    batch.set(docRef, object); //2 params: key, object value
  });

  await batch.commit();
  console.log('done');
}; 

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories'); //get a reference for the collection path
  const q = query(collectionRef); //use the reference get a query 

  const querySnapshot = await getDocs(q); //getDocs - method for execute query
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc
  }, {})

  return categoryMap;
};

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
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener =(callback) => onAuthStateChanged(auth, callback);