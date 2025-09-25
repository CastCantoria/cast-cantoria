<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h2 class="footer-title">C.A.S.T. – Cantoria</h2>
        <p>📍 Antananarivo, Madagascar</p>
        <p>📞 +261 34 11 361 57</p>
        <p>📞 +261 32 91 828 83</p>
        <p>✉️ castcantoria@gmail.com</p>
      </div>

      <div class="footer-section">
        <p class="footer-verse">
          “Ny lanitra mitory ny Voninahitrao, ary ny habakabaka maneho ny asan’ny tananao.”
        </p>
        <p class="footer-ref">– Salamo 19:1</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 C.A.S.T. – Tous droits réservés</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #111;
  color: #FFD700;
  padding: 2rem 1.5rem;
  border-top: 2px solid #FFD700;
  font-family: 'Inter', sans-serif;
}
.footer-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
}
.footer-section {
  text-align: center;
}
.footer-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.footer-verse {
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}
.footer-ref {
  font-size: 0.9rem;
  color: #C0C0C0;
}
.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.85rem;
  color: #C0C0C0;
}
@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
  .footer-section {
    flex: 1;
  }
}
</style>