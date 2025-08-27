import React from 'react';

export default function SocialLogin({ onGoogle, onFacebook }) {
  return (
    <div className="social-login d-flex justify-content-center gap-3 flex-wrap">
      <button type="button" onClick={onGoogle} className="btn btn-outline-danger flex-fill">
        <span className="bi bi-google me-2"></span> Google
      </button>
      <button type="button" onClick={onFacebook} className="btn btn-outline-primary flex-fill">
        <span className="bi bi-facebook me-2"></span> Facebook
      </button>
    </div>
  );
}