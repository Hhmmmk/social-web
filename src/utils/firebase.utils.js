import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA9_XRJT3LbY_p5LwCf4hrXNo4Khb1EhY0',
  authDomain: 'social-web-2673e.firebaseapp.com',
  projectId: 'social-web-2673e',
  storageBucket: 'social-web-2673e.appspot.com',
  messagingSenderId: '61675026679',
  appId: '1:61675026679:web:f221ae71eeb5581ac07bf2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore();

export const createUserDocument = async (user) => {
  const userDocRef = doc(database, 'users', user.id);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const uId = user.id;
    const displayName = user.userName;
    const createdAt = new Date();
    const friendsList = user.friendsList;

    try {
      await setDoc(userDocRef, {
        displayName,
        friendsList,
        createdAt,
        uId,
      });
    } catch (error) {
      console.log('error adding user', error.message);
    }
  }
  return userDocRef;
};
