import { initializeApp } from 'firebase/app';
import { getDatabase, ref, increment, set, onValue, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCuY7Ess6_5owSI8p0mCKDuR7TVj7CxfsY",
  authDomain: "thewealth-bf304.firebaseapp.com",
  databaseURL: "https://thewealth-bf304-default-rtdb.firebaseio.com",
  projectId: "thewealth-bf304",
  storageBucket: "thewealth-bf304.firebasestorage.app",
  messagingSenderId: "475633006970",
  appId: "1:475633006970:web:0d90de4014f79b72427ec3",
  measurementId: "G-2C5DBJHRQ4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const incrementUniqueVisitors = async (ipHash: string) => {
  const visitorRef = ref(database, `visitors/${ipHash}`);
  const totalRef = ref(database, 'totalVisitors');
  
  const snapshot = await get(visitorRef);
  if (!snapshot.exists()) {
    await set(visitorRef, true);
    await set(totalRef, increment(1));
  }
};

export const getTotalVisitors = (callback: (count: number) => void) => {
  const totalRef = ref(database, 'totalVisitors');
  onValue(totalRef, (snapshot) => {
    const count = snapshot.val() || 0;
    callback(count);
  });
};