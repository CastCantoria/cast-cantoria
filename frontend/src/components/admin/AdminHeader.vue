<template>
  <header class="admin-header">
    <div class="logo-container">
      <span class="logo">🎼</span>
      <h1 class="logo-text">C.A.S.T. Cantoria – Admin</h1>
    </div>

    <button class="burger-btn" @click="menuOpen = !menuOpen" aria-label="Menu">☰</button>

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
  flex-wrap: wrap;
  border-bottom: 1px solid #c8a951;
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
  font-size: 1.3rem;
  font-weight: bold;
  color: #c8a951;
}

.burger-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #c8a951;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
}

.nav-desktop {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
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
  .burger-btn {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
  }

  .nav-desktop {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: #000;
    padding: 1rem;
    width: 100%;
    z-index: 100;
  }

  .nav-desktop.open {
    display: flex;
  }
}
</style>