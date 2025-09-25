<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  images: Array,
  interval: { type: Number, default: 6000 }
})

const current = ref(0)
let timer = null

const goNext = () => {
  current.value = (current.value + 1) % props.images.length
}

const goPrev = () => {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

onMounted(() => {
  timer = setInterval(goNext, props.interval)
})
</script>

<template>
  <div class="slider">
    <transition name="fade" mode="out-in">
      <div class="slide" :key="current">
        <img :src="images[current].src" :alt="images[current].caption" />
        <p class="caption">« {{ images[current].caption }} »</p>
      </div>
    </transition>

    <button class="nav prev" @click="goPrev">‹</button>
    <button class="nav next" @click="goNext">›</button>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(200, 169, 81, 0.2);
  background: #fdfaf6;
}

.slide {
  text-align: center;
}

.slide img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

.caption {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #c8a951;
  font-style: italic;
  background: #f5f0e6;
  padding: 0.5rem;
  border-radius: 6px;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 2rem;
  color: #c8a951;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav:hover {
  background: #c8a951;
  color: #fff;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>