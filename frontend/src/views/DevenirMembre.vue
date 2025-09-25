<template>
  <div class="devenir-membre">
    <section class="intro">
      <h1 class="title">✨ Devenir membre du C.A.S.T.</h1>
      <p class="subtitle">
        Le sanctuaire est ouvert. La voix est libre. Et l’âme est invitée.
      </p>
    </section>

    <section class="content">
      <p>
        Depuis 2003, le C.A.S.T. rassemble des voix venues de toutes les Églises chrétiennes du FFKM. 
        Ce chœur n’est pas seulement un ensemble vocal — c’est une communion, une prière vivante, 
        une offrande musicale portée par la foi et l’art.
      </p>

      <p>
        Être membre, c’est :
        <ul>
          <li>🎶 Participer aux répétitions et aux concerts sacrés</li>
          <li>🤝 Rejoindre une communauté œcuménique et fraternelle</li>
          <li>📖 Accéder aux partitions, aux ressources et aux archives vivantes</li>
          <li>🕊️ Contribuer à une mission spirituelle et artistique</li>
        </ul>
      </p>

      <p>
        Aucune audition n’est imposée. Seule la sincérité du cœur compte. Que vous soyez chanteur, musicien, 
        traducteur, ou simplement porteur de lumière — votre présence est précieuse.
      </p>

      <div class="cta">
        <router-link to="/signup" class="cta-button">Je souhaite m’inscrire</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// Aucun script nécessaire ici, sauf si tu veux ajouter des animations ou des effets
</script>

<style scoped>
.devenir-membre {
  background-color: #000;
  color: #FFD700;
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
}
.subtitle {
  text-align: center;
  font-style: italic;
  margin-bottom: 2rem;
}
.content p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}
li {
  margin-bottom: 0.5rem;
}
.cta {
  text-align: center;
  margin-top: 2rem;
}
.cta-button {
  background-color: #FFD700;
  color: #000;
  padding: 0.8rem 1.6rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}
.cta-button:hover {
  background-color: #FFA500;
}
</style>