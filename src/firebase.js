import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAWOX8rTmzupfQbudzqiwrR_iflAWIwBag",
  authDomain: "padel-ranking-14268.firebaseapp.com",
  databaseURL: "https://padel-ranking-14268-default-rtdb.firebaseio.com",
  projectId: "padel-ranking-14268",
  storageBucket: "padel-ranking-14268.appspot.com",
  messagingSenderId: "536104704607",
  appId: "1:536104704607:web:25668e34302f17156799ea",
  measurementId: "G-2V0J1L2SNC"
};

const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);



export default dataBase;



