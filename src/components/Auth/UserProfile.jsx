// src/components/Auth/UserProfile.jsx
export default function UserProfile({ data }) {
  return (
    <div className="user-profile">
      <h3>Profil utilisateur</h3>
      <p><strong>Nom :</strong> {data.fullName}</p>
      <p><strong>Email :</strong> {data.email}</p>
      <p><strong>UID :</strong> {data.uid}</p>
      <p><strong>Créé le :</strong> {new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
}