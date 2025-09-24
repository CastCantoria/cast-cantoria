<template>
  <header class="admin-header">
    <div class="logo-container">
      <span class="logo">🎼</span>
      <h1 class="logo-text">C.A.S.T. Cantoria – Admin</h1>
    </div>

    <button class="burger-btn" @click="menuOpen = !menuOpen">☰</button>

    <nav :class="['nav-desktop', { open: menuOpen }]">
      <RouterLink to="/" class="nav-link">Accueil</RouterLink>
      <RouterLink to="/profile" class="nav-link">Profil</RouterLink>
      <button @click="handleLogout" class="nav-link logout-btn">Déconnexion</button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()
const menuOpen = ref(false)

const handleLogout = async () => {
  await logout(router)
}
</script>

<style scoped>
.admin-header {
  background-color: #000;
  color: #c8a951;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo {
  font-size: 1.5rem;
}
.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
}
.burger-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #c8a951;
  cursor: pointer;
}
.nav-desktop {
  display: flex;
  gap: 1rem;
}
.nav-link {
  color: #c8a951;
  text-decoration: none;
  font-weight: 500;
}
.nav-link:hover {
  text-decoration: underline;
}
.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
}
@media (max-width: 768px) {
  .burger-btn { display: block; }
  .nav-desktop {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background: #000;
    padding: 1rem;
    width: 100%;
  }
  .nav-desktop.open { display: flex; }
}
</style>