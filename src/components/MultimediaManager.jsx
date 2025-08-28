import { useState, useEffect } from 'react';
import { getUserMedia, uploadUserMedia, deleteUserMedia } from '../services/userService';

export default function MultimediaManager({ userId }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      const files = await getUserMedia(userId);
      setMediaFiles(files);
    };
    loadMedia();
  }, [userId]);

  const handleUpload = async () => {
    if (!newFile) return;
    await uploadUserMedia(userId, newFile);
    setNewFile(null);
    const updated = await getUserMedia(userId);
    setMediaFiles(updated);
  };

  const handleDelete = async (fileId) => {
    await deleteUserMedia(userId, fileId);
    const updated = await getUserMedia(userId);
    setMediaFiles(updated);
  };

  return (
    <div className="media-manager">
      <h2>🎶 Vos fichiers multimédia</h2>
      <input type="file" onChange={e => setNewFile(e.target.files[0])} />
      <button onClick={handleUpload}>Ajouter</button>

      <ul>
        {mediaFiles.map(file => (
          <li key={file.id}>
            <span>{file.name}</span>
            <button onClick={() => handleDelete(file.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}