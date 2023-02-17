import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signInWithPopup } from "firebase/auth";
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

//new instance, each app can have more than one provider
const provider = new GoogleAuthProvider();


provider.setCustomParameters({
    prompt: 'select_account'
})

//each app can only has one authentication method,所以provider需要new，这里只是一个function
export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider) 

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  //create一个reference-location for the user in database
  const userDocRef = doc(db, 'users', userAuth.uid)
  
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot); //a special instance created ?
  console.log(userSnapshot.exists()) //return false; collection里还没有这个document

   //if user data does NOT exist
   if(!userSnapshot.exists()) {
     const { displayName, email } = userAuth;
     const createdAt = new Date();

     try {
       await setDoc(userDocRef, {displayName, email, createdAt});
     } catch (error) {
       console.log('error creating the user', error.message)
     }
   }

   //if user exists
   return userDocRef;


}

 