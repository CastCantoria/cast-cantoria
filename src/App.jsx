import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ plus de BrowserRouter ici

// Pages
import Main from './pages/Main';
import Presentation from './pages/Presentation';
import Inspiration from './pages/Inspiration';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotreVoixComponent from './pages/Notre-Voix';
import Engagement from './pages/Engagement';
import Inscription from './pages/Inscription';
import EspaceMembre from './pages/EspaceMembre';
import Admin from './pages/Admin';
import AuthForm from './pages/AuthForm';
import Connexion from './pages/Connexion';
import Profil from './pages/Profil';
import Rejoindre from './pages/Rejoindre';
import APropos from './pages/APropos';
import Accueil from './pages/Accueil';
import Intentions from './pages/Intentions';
import SoumettreIntention from './pages/SoumettreIntention';
import AdminIntentions from './pages/AdminIntentions';

// Protection des routes
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/a-propos" element={<APropos />} />
      <Route path="/rejoindre" element={<Rejoindre />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/inspiration" element={<Inspiration />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/notre-voix" element={<NotreVoixComponent />} />
      <Route path="/engagement" element={<Engagement />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/espace-membre" element={<EspaceMembre />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/authform" element={<AuthForm />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/intentions" element={<Intentions />} />
      <Route path="/soumettre-intention" element={<SoumettreIntention />} />
      <Route path="/admin-intentions" element={<AdminIntentions />} />

      {/* 🔐 Route protégée */}
      <Route
        path="/profil"
        element={
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        }
      />

      {/* Route fallback */}
      <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
    </Routes>
  );
};

export default App;