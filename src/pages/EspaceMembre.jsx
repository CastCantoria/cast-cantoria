import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import SocialLogin from "../components/SocialLogin";
import UploadZone from "../components/UploadZone";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const EspaceMembre = () => {
  const [authMode, setAuthMode] = useState(null);
  const [user, setUser] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        await fetchMemberData(currentUser.email);
      } else {
        setMemberData(null);
        setFiles([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMemberData = async (email) => {
    try {
      const memberQuery = query(collection(db, "members"), where("email", "==", email));
      const memberSnap = await getDocs(memberQuery);

      if (!memberSnap.empty) {
        const memberDoc = memberSnap.docs[0];
        const memberInfo = { id: memberDoc.id, ...memberDoc.data() };
        setMemberData(memberInfo);

        // Récupérer les fichiers appartenant à ce membre
        const filesQuery = query(collection(db, "media"), where("ownerId", "==", memberDoc.id));
        const filesSnap = await getDocs(filesQuery);
        setFiles(filesSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
      } else {
        setMemberData(null);
        setFiles([]);
      }
    } catch (error) {
      console.error("Erreur récupération membre :", error);
      setMemberData(null);
      setFiles([]);
    }
  };

  if (loading) {
    return (
      <Layout>
        <section className="text-center py-5">
          <p>Chargement...</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-light text-center py-3">
        <p className="fst-italic text-secondary mb-0">
          « Derrière chaque voix, il y a une intention. Derrière chaque fichier, une offrande sonore. »
        </p>
      </section>

      <section className="section membre-access">
        <div className="container">
          <h2 className="section-title">🎶 Espace Membre</h2>

          {!user ? (
            <>
              <p className="section-intro">
                <strong>Bienvenue !</strong> Connectez-vous ou inscrivez-vous pour rejoindre le Chœur
                Artistique & Spirituel de Tanà.
              </p>

              <div className="button-group mb-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => setAuthMode("login")}
                >
                  Se connecter
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setAuthMode("signup")}
                >
                  S’inscrire
                </button>
              </div>

              {authMode === "login" && (
                <LoginForm onLoginSuccess={() => setAuthMode(null)} />
              )}
              {authMode === "signup" && (
                <SignupForm onSignupSuccess={() => setAuthMode(null)} />
              )}

              <div className="divider my-4">
                <span>ou</span>
              </div>
              <SocialLogin onLoginSuccess={() => setAuthMode(null)} />
            </>
          ) : (
            <>
              <div className="alert alert-success text-center">
                👋 Bienvenue {memberData?.name || "cher membre"}, que votre voix résonne avec lumière !
              </div>

              {memberData ? (
                <div className="mb-4">
                  <p>
                    <strong>Email :</strong> {memberData.email}
                  </p>
                  <p>
                    <strong>Rôle :</strong> {memberData.role || "member"}
                  </p>
                </div>
              ) : (
                <div className="alert alert-warning">
                  Votre profil n’est pas encore enregistré dans la base des membres.
                </div>
              )}

              <UploadZone />

              <h3 className="mt-4">📂 Vos fichiers</h3>
              {files.length === 0 ? (
                <p>Aucun fichier pour le moment.</p>
              ) : (
                <ul>
                  {files.map((file) => (
                    <li key={file.id}>
                      <a href={file.url} target="_blank" rel="noreferrer">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EspaceMembre;