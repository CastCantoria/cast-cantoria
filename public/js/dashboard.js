// public/js/dashboard.js

// Vérifie le rôle et affiche les boutons adaptés
function initDashboard() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Session expirée. Veuillez vous reconnecter.");
    window.location.href = '/admin/index.html';
    return;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload.role;

  const section = document.querySelector('section');
  section.innerHTML = ''; // Nettoie les anciens boutons

  const logoutBtn = createButton("Déconnexion", logout);
  section.appendChild(logoutBtn);

  if (role === 'admin') {
    section.appendChild(createButton("Voir les statistiques", showStats));
    section.appendChild(createButton("Gérer les utilisateurs", manageUsers));
  }

  if (role === 'editor') {
    section.appendChild(createButton("Modifier le contenu", editContent));
    section.appendChild(createButton("Soumettre un brouillon", submitDraft));
  }

  // Message motivant
  const message = document.createElement('p');
  message.textContent = role === 'admin'
    ? "🎩 Ny lohany tsy maintsy mandray andraikitra."
    : "✍️ Ny teny tsara dia toy ny fanilo amin’ny alina.";
  section.appendChild(message);
}

// Bouton réutilisable
function createButton(label, handler) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = handler;
  return btn;
}

// Fonctions d’action
function logout() {
  localStorage.removeItem('token');
  alert("Déconnecté avec succès");
  window.location.href = '/admin/index.html';
}

function showStats() {
  const stats = [
    { nom: "Tovoniaina", rôle: "admin", statut: "actif" },
    { nom: "Mialy", rôle: "editor", statut: "actif" },
    { nom: "Hery", rôle: "viewer", statut: "inactif" }
  ];

  const table = document.createElement('table');
  table.className = 'data-table';

  const thead = document.createElement('thead');
  thead.innerHTML = `<tr><th>Nom</th><th>Rôle</th><th>Statut</th></tr>`;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  stats.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${user.nom}</td><td>${user.rôle}</td><td>${user.statut}</td>`;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  document.body.appendChild(table);
}

function manageUsers() {
  alert("Redirection vers la gestion des utilisateurs...");
  // Tu peux ajouter ici une redirection ou un affichage dynamique
}

function editContent() {
  alert("Ouverture de l’éditeur de contenu...");
  // Tu peux intégrer un éditeur WYSIWYG ici
}

function submitDraft() {
  alert("Brouillon soumis avec succès !");
  // Tu peux simuler une requête POST ici
}

// Initialise le dashboard au chargement
window.onload = initDashboard;