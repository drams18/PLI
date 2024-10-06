const crypto = require("crypto");

const secretKey = "WlcRehIn7tXwHRUvi4ebMcNMp1kgB0CB"; // Remplace par ta clé secrète
const accessKeyId = "bec1686b9e0b2e61"; // Remplace par ta clé d'accès

// EAN du produit (code-barres)
const ean = "4020829010567";

// Chemin exact comme expliqué dans la documentation
const path = `/product/composition/${ean}?accessKeyId=${accessKeyId}`;

// Génération de la signature HMAC avec l'algorithme SHA256
const hmac = crypto.createHmac("sha256", secretKey).update(path).digest("hex");

console.log("HMAC Generated:", hmac);

// URL complète pour faire la requête à l'API
const apiUrl = `https://api.incibeauty.com${path}`;

// Faire une requête avec Axios en ajoutant la signature dans les en-têtes
const axios = require("axios");

axios
  .get(apiUrl, {
    headers: {
      "X-Signature": hmac, // Signature HMAC générée
    },
  })
  .then((response) => {
    // Afficher les données reçues de l'API
    console.log(response.data);
  })
  .catch((error) => {
    // Afficher les erreurs s'il y en a
    console.error("Erreur lors de la requête :", error.response?.status, error.response?.data);
  });