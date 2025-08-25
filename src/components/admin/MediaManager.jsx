import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const MediaManager = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "media"));
        setFiles(snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })));
      } catch (error) {
        console.error("Erreur chargement fichiers :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (file) => {
    if (!window.confirm("Supprimer ce fichier ?")) return;
    try {
      await deleteObject(ref(storage, file.storagePath));
      await deleteDoc(doc(db, "media", file.id));
      setFiles(prev => prev.filter(f => f.id !== file.id));
    } catch (error) {
      console.error("Erreur suppression fichier :", error);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h3>Fichiers uploadés ({files.length})</h3>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
            <button onClick={() => handleDelete(file)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaManager;