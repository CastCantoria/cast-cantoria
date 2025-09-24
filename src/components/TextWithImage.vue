<template>
  <div class="text-image" :class="position">
    <img :src="imageSrc" :alt="alt" class="image" />
    <p class="text" v-html="text"></p>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  text: { type: String, required: true },
  image: { type: String, required: true }, // nom du fichier dans /public/assets/images
  alt: { type: String, default: '' },
  position: { type: String, default: 'left' } // 'left' ou 'right'
})

const imageSrc = computed(() => `/assets/images/${props.image}`)
</script>

<style scoped>
.text-image {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}
.text-image.right {
  flex-direction: row-reverse;
}
.image {
  width: 200px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}
.text {
  flex: 1;
  color: #C0C0C0;
  line-height: 1.6;
}
</style>
