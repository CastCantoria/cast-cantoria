<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"

// Fonction d'envoi (à relier à un backend ou service email)
const sendMessage = () => {
  alert("Votre message a été envoyé. Merci de nous avoir contactés !");
}
</script>

<template>
  <div class="page">
    <Header />

    <main class="content">
      <div class="contact-header">
        <img src="/assets/images/logo-cantoria.png" alt="Logo C.A.S.T." class="logo" />
        <h1 class="title">C.A.S.T. - Contact</h1>
      </div>

      <p class="intro">
        Vous pouvez nous écrire directement à
        <a class="email-link" href="mailto:castcantoria@gmail.com">castcantoria@gmail.com</a>
        ou utiliser le formulaire ci-dessous.
      </p>

      <form class="contact-form" @submit.prevent="sendMessage">
        <label>
          Nom :
          <input type="text" required />
        </label>
        <label>
          Email :
          <input type="email" required />
        </label>
        <label>
          Message :
          <textarea rows="5" required></textarea>
        </label>
        <button type="submit">Envoyer</button>
      </form>

      <p class="verse">« Que tout ce qui respire loue l'Éternel »</p>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.page {
  background-color: #000;
  color: #C0C0C0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
.contact-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.logo {
  height: 60px;
  width: auto;
}
.title {
  font-family: var(--font-title);
  color: #FFD700;
}
.intro {
  margin-bottom: 1.5rem;
}
.email-link {
  color: #FFD700;
  font-weight: bold;
  text-decoration: none;
}
.email-link:hover {
  text-decoration: underline;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #FFD700;
  border-radius: 4px;
  background: #111;
  color: #C0C0C0;
}
.contact-form button {
  background: #FFD700;
  color: #000;
  padding: 0.7rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}
.contact-form button:hover {
  background: #C0A000;
}
.verse {
  text-align: center;
  font-style: italic;
  color: #FFD700;
}
</style>
