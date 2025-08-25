import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "members"));
        setMembers(snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })));
      } catch (error) {
        console.error("Erreur chargement membres :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await updateDoc(doc(db, "members", id), { role: newRole });
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce membre ?")) return;
    await deleteDoc(doc(db, "members", id));
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {members.map(member => (
          <tr key={member.id}>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>
              <select
                value={member.role || "member"}
                onChange={(e) => handleRoleChange(member.id, e.target.value)}
              >
                <option value="member">Membre</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <button onClick={() => handleDelete(member.id)}>🗑️ Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberList;