import { initializeApp } from 'firebase/app';
import { getDatabase, ref, increment, set, onValue, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
