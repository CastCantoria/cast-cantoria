const ContentManager = () => {
  return (
    <section className="content-manager p-6">
      <h2 className="text-xl font-semibold mb-4">🖼️ Gestion du contenu</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>📷 Galerie</li>
        <li>📄 Présentation</li>
        <li>📢 Engagement</li>
        <li>📝 Inscription</li>
      </ul>
      <p className="mt-4 text-gray-600">Ajoute, modifie ou supprime les contenus affichés sur le site.</p>
    </section>
  );
};

export default ContentManager;