const crypto = require("crypto");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const secretKey = "HCZaBfeVs6hTGG/X2lPZ4U8z07WUHYkG";
const accessKeyId = "411cad030a17e1fa";

const filePath = path.join(__dirname, "./codebarres/barcode_part_2.json");
const productsFilePath = path.join(__dirname, "./products/products.json");

function initializeProductsFile() {
  if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, JSON.stringify([]), "utf8");
  }

  const fileContent = fs.readFileSync(productsFilePath, "utf8");
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

// lire les EANs depuis barcode.json
function loadEANsFromFile() {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    try {
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
      return [];
    }
  } else {
    console.error("Le fichier des produits à insérer n'existe pas.");
    return [];
  }
}

// récupérer les détails d'un produit via l'API
async function fetchProductDetails(ean) {
  const apiPath = `/product/composition/${ean}?accessKeyId=${accessKeyId}`;
  const hmac = crypto.createHmac("sha256", secretKey).update(apiPath).digest("hex");
  const apiUrl = `https://api.incibeauty.com${apiPath}&hmac=${hmac}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(`Erreur pour EAN ${ean}:`, error.response?.status, error.response?.data);
    return null;
  }
}

// sauvegarder les produits dans le fichier JSON par lots
function saveProductsInBatches(products) {
  const cutSize = 1000; 
  const currentProducts = initializeProductsFile();
  const updatedProducts = [...currentProducts, ...products];

  // Sauvegarde par lots
  for (let i = 0; i < updatedProducts.length; i += cutSize) {
    const batch = updatedProducts.slice(i, i + cutSize);
    const cutFilePath = path.join(__dirname, `./products/products_cut_${Math.floor(i / cutSize) + 2}.json`);
    fs.writeFileSync(cutFilePath, JSON.stringify(batch, null, 2), "utf8");
  }

  console.log("Produits sauvegardés par lots.");
}

// fonction pour afficher la progression
function showProgress(current, total) {
  const percentage = ((current / total) * 100).toFixed(2);
  console.log(`Progression : ${current}/${total} (${percentage}%)`);
}

// traiter les EANs
async function processEANs() {
  let products = [];
  let validEANs = loadEANsFromFile();
  const totalEANs = validEANs.length;

  for (let i = 0; i < validEANs.length; i++) {
    const ean = validEANs[i];
    const productDetails = await fetchProductDetails(ean);

    if (productDetails) {
      console.log(`Produit récupéré pour EAN ${ean}:`, productDetails.name);
      products.push(productDetails);
    }

    // Afficher la progression
    showProgress(i + 1, totalEANs);

    // Sauvegarder après chaque 1000 produits pour éviter les erreurs de mémoire
    if (products.length >= 1000) {
      saveProductsInBatches(products);
      products = []; // Réinitialiser les produits après sauvegarde
    }
  }

  // Sauvegarder les produits restants
  if (products.length > 0) {
    saveProductsInBatches(products);
  }

  console.log("Tous les produits ont été récupérés et sauvegardés.");
}

processEANs();
