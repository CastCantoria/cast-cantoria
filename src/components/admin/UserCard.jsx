const UserCard = ({ user }) => {
  const { displayName, email, role = 'member' } = user;

  return (
    <div className="user-card p-4 border rounded shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{displayName || 'Utilisateur sans nom'}</h3>
      <p className="text-sm text-gray-600">Email : {email}</p>
      <p className="text-sm text-gray-600">Rôle : {role}</p>

      <div className="mt-2 flex gap-2">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => console.log('Modifier', user.uid)}
        >
          Modifier
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => console.log('Supprimer', user.uid)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default UserCard;