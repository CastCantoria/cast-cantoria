import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export async function uploadFileAndGetURL(file, path) {
  try {
    const storage = getStorage()
    const ref = storageRef(storage, path)
    await uploadBytes(ref, file)
    return await getDownloadURL(ref)
  } catch (error) {
    console.error("Erreur d'upload :", error)
    throw error
  }
}

export async function deleteFile(path) {
  try {
    const storage = getStorage()
    const ref = storageRef(storage, path)
    await deleteObject(ref)
  } catch (error) {
    console.error("Erreur de suppression :", error)
    throw error
  }
}