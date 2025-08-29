import Papa from 'papaparse';
import { importUserToFirestore } from '../services/userService';

export default function ImportMembres() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        for (const user of results.data) {
          await importUserToFirestore(user);
        }
        alert("Importation terminée 🎶");
      }
    });
  };

  return (
    <div className="container py-5">
      <h2>📥 Importer des membres</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}