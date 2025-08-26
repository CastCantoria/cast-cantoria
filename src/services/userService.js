import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
};