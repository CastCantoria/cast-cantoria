import fetch from "node-fetch";

const test = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/ping");
    const data = await res.json();
    console.log("✅ Réponse API :", data);
  } catch (err) {
    console.error("❌ Erreur :", err.message);
  }
};

test();
