<template>
  <transition name="fade-scale">
    <div
      v-if="visible"
      class="welcome-box"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      tabindex="0"
      @keydown.esc="dismiss"
    >
      <div class="box-content">
        <h2 id="welcome-title" class="text-2xl font-bold mb-2">
          Bienvenue {{ firstName }} 👋
        </h2>
        <p class="text-sm mb-4">
          Tu es inscrit en tant que <strong>{{ role }}</strong>.
          Tu peux modifier ton profil à tout moment.
        </p>
        <button @click="dismiss" class="btn-close">Continuer</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useWelcome } from '@/composables/useWelcome'

const { visible, firstName, role, checkWelcome, dismiss } = useWelcome()

checkWelcome()
</script>

<style scoped>
.welcome-box {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  outline: none;
}

.box-content {
  background-color: #FFD700;
  color: #000;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 90%;
  width: 360px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.btn-close {
  margin-top: 1rem;
  background: #000;
  color: #FFD700;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.btn-close:hover {
  background: #FFD700;
  color: #000;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>