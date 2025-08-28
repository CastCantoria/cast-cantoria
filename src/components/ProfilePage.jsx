import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserProfile, updateAvatar } from '../services/userService';
import AvatarUploader from './AvatarUploader';
import MultimediaManager from './MultimediaManager';

export default function ProfilePage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState({ nom: '', prenom: '', avatarUrl: '' });

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchUserProfile(user.uid);
      if (data) setProfile(data);
    };
    loadProfile();
  }, [user.uid]);

  const handleAvatarUpload = async (file) => {
    const url = await updateAvatar(user.uid, file);
    setProfile(prev => ({ ...prev, avatarUrl: url }));
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
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Nom :</strong> {profile.nom}</p>
        <p><strong>Prénom :</strong> {profile.prenom}</p>
      </div>

      <hr />
      <MultimediaManager userId={user.uid} />
    </div>
  );
}