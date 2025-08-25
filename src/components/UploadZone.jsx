import React, { useRef, useState } from 'react';

const UploadZone = () => {
  const fileInputRef = useRef(null);
  const [feedback, setFeedback] = useState('');
  const [mediaElements, setMediaElements] = useState([]);

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    if (!files.length) return;

    setFeedback(`${files.length} fichier(s) sélectionné(s).`);

    const newMedia = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image') ? 'img' : 'audio';

      return { url, type };
    });

    setMediaElements((prev) => [...prev, ...newMedia]);
  };

  return (
    <section className="container mb-5">
      <div className="upload-zone text-center p-4 border rounded bg-light">
        <p className="mb-2">🎶 Déposez vos fichiers ici ou cliquez pour choisir</p>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*,audio/*,video/*"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button className="btn btn-primary" onClick={handleFileClick}>
          Choisir un fichier
        </button>
        <div className="mt-3 text-success">{feedback}</div>
      </div>

      <div className="row g-4 mt-4" id="media-gallery">
        {mediaElements.map((media, index) => (
          <div key={index} className="col-md-4">
            {media.type === 'img' ? (
              <img src={media.url} alt={`media-${index}`} className="img-fluid rounded" />
            ) : (
              <audio src={media.url} controls className="w-100" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UploadZone;