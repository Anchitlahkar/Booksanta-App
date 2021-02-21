import firebase from 'firebase';
// require('@firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDlg_P4___CK_wvIq5iWBW-VdZd20rAFwc',
  authDomain: 'booksanta2-0.firebaseapp.com',
  databaseURL: 'https://booksanta2-0-default-rtdb.firebaseio.com',
  projectId: 'booksanta2-0',
  storageBucket: 'booksanta2-0.appspot.com',
  messagingSenderId: '84494695685',
  appId: '1:84494695685:web:4b6e23266367a15a338b6c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();
