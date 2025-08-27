import React, { useState } from 'react';
import { auth } from '../firebase';
import { updateProfile, updatePassword } from 'firebase/auth';

const EditProfil = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName, photoURL });
      if (newPassword) await updatePassword(user, newPassword);
      alert("✅ Profil mis à jour !");
    } catch (error) {
      console.error(error);
      alert("❌ Échec de la mise à jour.");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="mt-4">
      <h4 className="mb-3">Modifier mon profil</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Nom affiché"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type="url"
        className="form-control mb-2"
        placeholder="URL de la photo"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-success">Mettre à jour</button>
    </form>
  );
};

export default EditProfil;