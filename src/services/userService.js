import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  getDocs
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

const db = getFirestore();
const storage = getStorage();

// 🔍 Récupérer le profil utilisateur
export async function fetchUserProfile(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// 🖼️ Mettre à jour l'avatar
export async function updateAvatar(uid, file) {
  const avatarRef = ref(storage, `avatars/${uid}`);
  await uploadBytes(avatarRef, file);
  const url = await getDownloadURL(avatarRef);
  await updateDoc(doc(db, 'users', uid), { avatarUrl: url });
  return url;
}

// 📄 Mettre à jour les infos du profil
export async function updateUserInfo(uid, updates) {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, updates);
}

// 🎶 Récupérer les fichiers multimédia
export async function getUserMedia(uid) {
  const mediaRef = collection(db, 'users', uid, 'media');
  const snapshot = await getDocs(mediaRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ➕ Ajouter un fichier multimédia
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

// ❌ Supprimer un fichier multimédia
export async function deleteUserMedia(uid, fileId) {
  await deleteDoc(doc(db, 'users', uid, 'media', fileId));
}

// 📥 Importer un utilisateur depuis un fichier CSV
export async function importUserToFirestore({ email, nom, prenom, telephone }) {
  const uid = email.replace(/[@.]/g, '_');
  await setDoc(doc(db, 'users', uid), {
    email,
    nom,
    prenom,
    telephone,
    avatarUrl: ''
  });
}