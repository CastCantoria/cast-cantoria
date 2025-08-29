import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/userService';
import UserCard from './UserCard';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.error('Erreur chargement utilisateurs:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="users-panel p-6">
      <h2 className="text-xl font-semibold mb-4">👥 Gestion des membres</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <div className="user-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard key={user.uid} user={user} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UsersPanel;