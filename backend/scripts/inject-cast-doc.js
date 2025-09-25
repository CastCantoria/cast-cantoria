import fs from "fs";
import path from "path";
import mammoth from "mammoth";

const docxPath = "cast tout.docx"; // placé à la racine du projet
const imagesDir = "public/assets/images";
const viewsDir = "src/views";
const routerFile = "src/router/index.js";

// 1️⃣ Récupérer la liste exacte des images
const images = fs.readdirSync(imagesDir).filter(file =>
  /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
);

if (images.length === 0) {
  console.error("⚠️ Aucune image trouvée dans", imagesDir);
  process.exit(1);
}

// 2️⃣ Lire le document Word
const { value: text } = await mammoth.extractRawText({ path: docxPath });

// 3️⃣ Découper en sections
const sections = text
  .split(/\n(?=[A-ZÉÈÀÂÎÔÛÇ\s]{3,})/)
  .map(s => s.trim())
  .filter(Boolean);

let newRoutes = [];

sections.forEach((section, idx) => {
  const lines = section.split("\n").filter(Boolean);
  const title = lines[0];
  const paragraphs = lines.slice(1);

  // Nettoyer et limiter le nom de fichier
  let safeName = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (safeName.length > 50) {
    safeName = safeName.substring(0, 50);
  }

  const vueFileName = safeName + ".vue";
  const vuePath = path.join(viewsDir, vueFileName);

  let imgIndex = 0;
  const contentBlocks = paragraphs.map((p, i) => {
    const img = images[imgIndex % images.length];
    imgIndex++;
    return `
      <TextWithImage
        text="${p.replace(/"/g, '\\"')}"
        image="${img}"
        alt="${title}"
        position="${i % 2 === 0 ? "left" : "right"}"
      />`;
  }).join("\n");

  const vueContent = `
<script setup>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import TextWithImage from "../components/TextWithImage.vue"
</script>

<template>
  <div class="page">
    <Header />
    <main class="content">
      <h1 class="title">${title}</h1>
      ${contentBlocks}
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
}
.title {
  font-family: var(--font-title);
  color: #FFD700;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
`;

  fs.writeFileSync(vuePath, vueContent, "utf8");
  console.log(`✅ Page créée : ${vuePath}`);

  // Ajouter la route correspondante
  const routeName = title.replace(/"/g, '\\"');
  newRoutes.push(`{ path: "/${safeName}", name: "${routeName}", component: () => import("../views/${vueFileName}") }`);
});

// 5️⃣ Mise à jour automatique du router
let routerContent = fs.readFileSync(routerFile, "utf8");

// On insère les nouvelles routes avant la fermeture du tableau `routes`
routerContent = routerContent.replace(
  /(const routes\s*=\s*\[)([\s\S]*?)(\])/,
  (match, start, middle, end) => {
    return `${start}${middle.trim()},\n  ${newRoutes.join(",\n  ")}${end}`;
  }
);

fs.writeFileSync(routerFile, routerContent, "utf8");
console.log("✨ Router mis à jour avec les nouvelles pages.");