import requests
from bs4 import BeautifulSoup
import json

base_url = "https://incibeauty.com/search/k/soin%20contour%20l%C3%A8vres"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

all_eans = []  # Liste pour stocker tous les EAN

# On suppose qu'il y a un nombre maximum de pages à parcourir (ajuster selon les besoins)
max_pages = 4

for page in range(1, max_pages + 1):
    url = f"{base_url}?page={page}"  # Modifier l'URL pour chaque page
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(f"Page {page} récupérée avec succès!")
    else:
        print(f"Erreur lors de la récupération de la page {page}: {response.status_code}")
        break  # Sortir de la boucle si une page ne peut pas être récupérée

    soup = BeautifulSoup(response.content, 'html.parser')
    products = soup.find_all('div', class_='product-apercu')

    print(f"Nombre de produits trouvés sur la page {page}: {len(products)}")

    for product in products:
        link = product.find('a', class_='color-inherit')
        ean = link['href'].split('/')[-1] if link else None
        
        if ean:
            all_eans.append(ean)  # Ajouter l'EAN à la liste

# Enregistrer les EAN dans un fichier barcode.json
with open('../apiFlawa/jsons/soin_contour_levres.json', 'w') as f:
    json.dump(all_eans, f, indent=4)  # Enregistrer avec une indentation pour la lisibilité

print(f"Tous les EAN trouvés ont été enregistrés dans le fichier .json sélectionné.")
