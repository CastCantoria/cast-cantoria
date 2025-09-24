<template>
  <aside class="admin-sidebar">
    <nav>
      <RouterLink to="/admin" class="nav-item">📊 Tableau de bord</RouterLink>
      <RouterLink to="/admin/media" class="nav-item">🖼️ Médias</RouterLink>
      <RouterLink to="/admin/users" class="nav-item">👥 Utilisateurs</RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  width: 220px;
  flex-shrink: 0;
  background-color: #111;
  color: #c8a951;
  padding: 1rem;
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