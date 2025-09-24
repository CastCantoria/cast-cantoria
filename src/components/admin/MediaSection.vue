<template>
  <section>
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <span>{{ icon }}</span> {{ title }}
    </h2>

    <div v-if="items.length === 0" class="text-gray-500 text-center py-8">
      <p>Aucun {{ title.toLowerCase() }} trouvé.</p>
      <button class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Ajouter un(e) {{ title.toLowerCase() }}
      </button>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <slot :items="items" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
  icon: String
})
</script>