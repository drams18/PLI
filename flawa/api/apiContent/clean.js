const fs = require('fs');
const path = require('path');

// Chemin vers le fichier JSON
const jsonFilePath = path.join(__dirname, './barcodeFinal.json');

// Fonction pour lire le fichier JSON
function readJsonFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

// Fonction pour écrire les données dans le fichier JSON
function writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Fonction pour supprimer les chaînes en double
function removeDuplicateStrings(jsonData) {
    // Ici, nous utilisons un Set pour stocker les chaînes uniques
    const uniqueStrings = new Set();
    
    const cleanedData = jsonData.filter(item => {
        if (typeof item === 'string') {
            if (uniqueStrings.has(item)) {
                // Si la chaîne est déjà dans le Set, on la supprime
                return false;
            } else {
                // Sinon, on l'ajoute dans le Set
                uniqueStrings.add(item);
                return true;
            }
        }
        return true; // Si l'élément n'est pas une chaîne, on le garde
    });

    return cleanedData;
}

// Lire les données du fichier JSON
let jsonData = readJsonFile(jsonFilePath);

// Supprimer les chaînes en double
let cleanedData = removeDuplicateStrings(jsonData);

// Écrire les données nettoyées dans le fichier JSON
writeJsonFile(jsonFilePath, cleanedData);

console.log('Doublons supprimés avec succès!');
