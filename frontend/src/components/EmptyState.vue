<template>
  <div class="text-center text-gray-500">
    <slot name="icon" />
    <p class="mt-4">{{ message }}</p>
    <slot name="action" />
  </div>
</template>

<script setup>
defineProps({
  message: String
})
</script>