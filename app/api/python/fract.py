import json
import os

# Charger le fichier JSON
with open('../apiFlawa/barcodes/barcode1.json', 'r') as f:
    data = json.load(f)

# Nombre de lignes par fichier
lines_per_file = 1000

# Répertoire où tu veux sauvegarder les fichiers fractionnés
output_dir = '../apiFlawa/codebarres'

# Créer le répertoire s'il n'existe pas
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Fractionner les données et sauvegarder dans le nouveau répertoire
for i in range(0, len(data), lines_per_file):
    split_data = data[i:i+lines_per_file]
    output_file_path = os.path.join(output_dir, f'barcode_part_{i//lines_per_file + 11}.json')
    with open(output_file_path, 'w') as outfile:
        json.dump(split_data, outfile, indent=4)

print("Le fichier JSON a été fractionné et enregistré dans le répertoire spécifié avec succès.")
