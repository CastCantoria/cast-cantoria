import React from 'react';

export default function AudioPlayer({ src, title }) {
  return (
    <div className="audio-player">
      {title && <h3 className="audio-title">🎵 {title}</h3>}
      <audio controls className="audio-element">
        <source src={src} type="audio/mp3" />
        Votre navigateur ne supporte pas l’audio.
      </audio>
    </div>
  );
}