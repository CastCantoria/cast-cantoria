<template>
  <div class="space-y-8">
    <MediaSection title="Images" :items="images" icon="🖼️" />
    <MediaSection title="Vidéos" :items="videos" icon="🎥" />
    <MediaSection title="Audios" :items="audios" icon="🎵" />
  </div>
</template>

<script setup>
import MediaSection from '@/components/admin/MediaSection.vue'

const images = []   // à remplir dynamiquement depuis Firestore ou Storage
const videos = []   // idem
const audios = []   // idem
</script>