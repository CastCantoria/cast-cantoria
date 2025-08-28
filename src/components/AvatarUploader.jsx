import { useState } from 'react';

export default function AvatarUploader({ currentAvatar, onUpload }) {
  const [preview, setPreview] = useState(currentAvatar || '/assets/images/default-avatar.png');
  const [file, setFile] = useState(null);

  const handleChange = e => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = () => {
    if (file) onUpload(file);
  };

  return (
    <div className="avatar-uploader">
      <img src={preview} alt="Prévisualisation avatar" className="avatar-preview" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit} className="btn btn-secondary mt-2">
        Mettre à jour l’avatar
      </button>
    </div>
  );
}