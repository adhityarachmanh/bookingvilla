import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA42bwfU-zuF6r7gYi81xj0OrTc-VRxmoU",
  authDomain: "rizka-pi.firebaseapp.com",
  databaseURL: "https://rizka-pi.firebaseio.com",
  projectId: "rizka-pi",
  storageBucket: "rizka-pi.appspot.com",
  messagingSenderId: "304515211941",
  appId: "1:304515211941:web:51ebaf7c139ec5d2"


}
firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })
export default firebase
