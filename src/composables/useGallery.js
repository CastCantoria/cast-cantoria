import { listAll, ref as storageRef, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase"

export async function fetchGalleryImages(folder = "galerie") {
  const folderRef = storageRef(storage, folder)
  const result = await listAll(folderRef)
  const urls = await Promise.all(
    result.items.map(item => getDownloadURL(item))
  )
  return urls
}