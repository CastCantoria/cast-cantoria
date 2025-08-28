import { getFirestore, doc, getDoc, updateDoc, setDoc, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const db = getFirestore();
const storage = getStorage();

export async function fetchUserProfile(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function updateAvatar(uid, file) {
  const avatarRef = ref(storage, `avatars/${uid}`);
  await uploadBytes(avatarRef, file);
  const url = await getDownloadURL(avatarRef);
  await updateDoc(doc(db, 'users', uid), { avatarUrl: url });
  return url;
}

export async function getUserMedia(uid) {
  const mediaRef = collection(db, 'users', uid, 'media');
  const snapshot = await getDocs(mediaRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function uploadUserMedia(uid, file) {
  const fileRef = ref(storage, `media/${uid}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  await addDoc(collection(db, 'users', uid, 'media'), {
    name: file.name,
    url,
    type: file.type,
    timestamp: Date.now()
  });
}

export async function deleteUserMedia(uid, fileId) {
  await deleteDoc(doc(db, 'users', uid, 'media', fileId));
}