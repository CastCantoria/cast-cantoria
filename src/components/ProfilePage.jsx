import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserProfile, updateAvatar, updateUserInfo } from '../services/userService';
import AvatarUploader from './AvatarUploader';
import MultimediaManager from './MultimediaManager';

export default function ProfilePage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState({
    nom: '',
    prenom: '',
    avatarUrl: '',
    email: '',
    telephone: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchUserProfile(user.uid);
      if (data) {
        setProfile(data);
        setFormData(data); // initialise le formulaire avec les données
      }
    };
    loadProfile();
  }, [user.uid]);

  const handleAvatarUpload = async (file) => {
    const url = await updateAvatar(user.uid, file);
    setProfile(prev => ({ ...prev, avatarUrl: url }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateUserInfo(user.uid, formData);
    setProfile(prev => ({ ...prev, ...formData }));
    setEditMode(false);

    // 🌿 Rituel de validation
    new Audio('/assets/audio/success.mp3').play();
    alert("Profil mis à jour avec succès 🙏");
  };

  return (
    <div className="profile-page">
      <h1>Bienvenue, {profile.prenom} {profile.nom} 👋</h1>
      <p>« Ny faharetana no fanalahidy »</p>

      <AvatarUploader
        currentAvatar={profile.avatarUrl}
        onUpload={handleAvatarUpload}
      />

      <div className="info-section mt-4">
        <p><strong>Email :</strong> {profile.email || user.email}</p>
        <p><strong>Nom :</strong> {profile.nom || 'Non renseigné'}</p>
        <p><strong>Prénom :</strong> {profile.prenom || 'Non renseigné'}</p>
        <p><strong>Téléphone :</strong> {profile.telephone || 'Non renseigné'}</p>
      </div>

      <div className="profile-edit mt-5">
        <h3>📝 Modifier mon profil</h3>

        {!editMode ? (
          <button className="btn btn-outline-primary mt-2" onClick={() => setEditMode(true)}>
            Activer la modification
          </button>
        ) : (
          <div className="form-group mt-3 text-start">
            <label>Nom</label>
            <input name="nom" value={formData.nom} onChange={handleChange} className="form-control mb-2" />

            <label>Prénom</label>
            <input name="prenom" value={formData.prenom} onChange={handleChange} className="form-control mb-2" />

            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} className="form-control mb-2" />

            <label>Téléphone</label>
            <input name="telephone" value={formData.telephone} onChange={handleChange} className="form-control mb-2" />

            <button className="btn btn-success mt-3 me-2" onClick={handleSave}>
              Enregistrer les modifications
            </button>
            <button className="btn btn-secondary mt-3" onClick={() => setEditMode(false)}>
              Annuler
            </button>
          </div>
        )}
      </div>

      <hr />
      <MultimediaManager userId={user.uid} />
    </div>
  );
}