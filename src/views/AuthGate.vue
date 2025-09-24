<template>
  <div class="auth-gate">
    <img src="/assets/avatar.png" class="avatar" alt="Avatar" />
    <p class="welcome-text">Bienvenue dans le sanctuaire.</p>
    <button @click="goTo('login')">🔐 Se connecter</button>
    <button @click="goTo('signup')">✨ S’inscrire</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goTo = (route) => router.push(`/${route}`)
</script>

<style scoped>
.auth-gate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}
.welcome-text {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #444;
}
button {
  margin: 0.5rem;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ececec;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #dcdcdc;
}
</style>