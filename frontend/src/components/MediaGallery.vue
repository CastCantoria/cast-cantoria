<template>
  <section class="gallery">
    <h2 class="title">Galerie multimédia</h2>
    <div class="grid">
      <figure v-for="(item, i) in items" :key="i" class="tile">
        <template v-if="item.type === 'image'">
          <img :src="item.src" :alt="item.caption" loading="lazy" />
        </template>
        <template v-else-if="item.type === 'audio'">
          <audio controls :src="item.src"></audio>
        </template>
        <template v-else-if="item.type === 'video'">
          <video controls :src="item.src" width="100%"></video>
        </template>
        <figcaption v-if="item.caption" class="caption">{{ item.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] }
})
</script>

<style scoped>
.gallery { background:#000; padding:2rem; }
.title { color:#FFD700; text-align:center; margin-bottom:1.5rem; font-size:1.8rem; }
.grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap:1rem; }
.tile { background:#111; border:1px solid #222; border-radius:6px; padding:0.5rem; text-align:center; }
img, video { max-width:100%; border-radius:4px; }
audio { width:100%; margin-top:0.5rem; }
.caption { color:#C0C0C0; margin-top:0.5rem; font-size:0.9rem; }
</style>
