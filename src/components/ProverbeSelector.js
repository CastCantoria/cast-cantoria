// src/components/ProverbeSelector.js

export default function ProverbeSelector() {
  const proverbes = [
    "Ny feo mitambatra no mahery.",
    "Ny fanombohana tsara no manome hery hatrany amin’ny farany.",
    "Ny asa vita tsara no mitondra voninahitra.",
    "Ny faharetana no fanalahidy.",
    "Ny feo rehetra dia mitondra hafatra."
  ];

  const index = Math.floor(Math.random() * proverbes.length);
  return proverbes[index];
}