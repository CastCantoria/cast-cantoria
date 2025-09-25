<template>
  <aside class="admin-sidebar">
    <h2 class="sidebar-title">🎼 Admin</h2>
    <nav class="sidebar-nav">
      <RouterLink to="/admin/dashboard" class="nav-item">📊 Tableau de bord</RouterLink>
      <RouterLink to="/admin/media" class="nav-item">🖼️ Médias</RouterLink>
      <RouterLink to="/admin/users" class="nav-item">👥 Utilisateurs</RouterLink>
      <RouterLink to="/logout" class="nav-item">🚪 Déconnexion</RouterLink>
    </nav>
  </aside>
</template>

<script setup></script>

<style scoped>
.admin-sidebar {
  width: 220px;
  background-color: #111;
  color: #c8a951;
  padding: 1rem;
  min-height: 100vh;
  flex-shrink: 0;
}
.sidebar-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.nav-item {
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  color: #c8a951;
  font-weight: 500;
}
.nav-item:hover {
  background-color: rgba(200, 169, 81, 0.1);
}
</style>