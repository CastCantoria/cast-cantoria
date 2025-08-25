import { useState } from "react";
import Papa from "papaparse";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const MemberImporter = () => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        setLoading(true);
        try {
          for (const row of results.data) {
            if (row.name && row.email) {
              await addDoc(collection(db, "members"), {
                name: row.name,
                email: row.email,
                role: "member",
                createdAt: new Date()
              });
            }
          }
          alert("Import terminé !");
        } catch (error) {
          console.error("Erreur import :", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {loading && <p>Import en cours...</p>}
    </div>
  );
};

export default MemberImporter;