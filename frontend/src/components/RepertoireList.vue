<template>
  <section class="repertoire">
    <h3 class="title">Répertoire</h3>

    <div v-if="european && european.length">
      <h4 class="section">Œuvres européennes</h4>
      <ul class="list">
        <li v-for="(item, i) in european" :key="i" class="li">
          <span class="work">{{ item.title }}</span>
          <em v-if="item.composer" class="composer"> — {{ item.composer }}</em>
        </li>
      </ul>
    </div>

    <div v-if="malagasy && malagasy.length">
      <h4 class="section">Œuvres malgaches</h4>
      <ul class="list">
        <li v-for="(item, i) in malagasy" :key="i" class="li">
          <span class="work">{{ item.title }}</span>
          <em v-if="item.composer" class="composer">  {{ item.composer }}</em>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  european: { type: Array, default: () => [] },
  malagasy: { type: Array, default: () => [] }
})
</script>

<style scoped>
.repertoire { background:#000; padding:1.5rem; }
.title { color:#FFD700; margin-bottom:.75rem; }
.section { color:#FFD700; margin-top:1rem; margin-bottom:.25rem; }
.list { list-style: none; padding:0; margin:0; }
.li { color:#C0C0C0; padding:.35rem 0; border-bottom:1px dotted #222; }
.work { color:#C0C0C0; }
.composer { color:#C0C0C0; opacity:.85; }
</style>
