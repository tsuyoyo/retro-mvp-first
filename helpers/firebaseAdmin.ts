import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../credentials/serviceAccountKey.json');

export const firebase = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.apps[0]!!;

export const db = getFirestore(firebase);

// memo: あとでendpoint追加する時、こんな感じでDB触る
// console.log('aaaa');
// const docRef = db.collection('collections').doc('alovelace');
// console.log('bbbb');
// docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815,
// });
