import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import ProductDetails from "./ProductDetails";
import ProductItem from "./ProductItem";
import CategoryList from "../category/CategoryList";

const categories = [
  { id: 1, name: "Soins du visage" },
  { id: 2, name: "Maquillage" },
  { id: 3, name: "Soins capillaires" },
  { id: 4, name: "Parfums" },
  { id: 5, name: "Hygiène" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSearchButton, setShowSearchButton] = useState(true);

  const fetchProducts = async () => {
    if (loading || loadingMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://produits-beaute-api.s3.eu-west-3.amazonaws.com/products_cut_1.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError("Erreur lors du chargement des produits");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    setShowSearchButton(false); // Masquer le bouton lors de la recherche
    const results = products.filter((product) => {
      const matchesName =
        product.name && product.name.toLowerCase().includes(query.toLowerCase());
      const matchesBrand =
        product.brand && product.brand.toLowerCase().includes(query.toLowerCase());
      const matchesEan =
        product.eans && product.eans.some((ean) => ean.includes(query));
      return matchesName || matchesBrand || matchesEan;
    });

    const sortedResults = results.sort((a, b) => {
      const nameComparison = a.name
        .toLowerCase()
        .localeCompare(b.name.toLowerCase());
      const scoreComparison = (b.validation_score || 0) - (a.validation_score || 0);
      return nameComparison || scoreComparison;
    });

    setFilteredProducts(sortedResults);
    setPage(0);
    setHasMore(sortedResults.length > 15);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoadingMore(false);
        if ((page + 1) * 15 >= filteredProducts.length) {
          setHasMore(false);
        }
      }, 1000);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSuggestions([]); // Effacer les suggestions quand un produit est sélectionné
    setQuery(product.name); // Remplir la barre de recherche avec le produit sélectionné
  };

  // Fonction de filtrage pour les suggestions
  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const matches = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(text.toLowerCase()) ||
          (product.brand &&
            product.brand.toLowerCase().includes(text.toLowerCase()))
        );
      });
      setSuggestions(matches.slice(0, 5)); // Limite à 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleCategoryPress = (category) => {
    // Ici, vous pouvez gérer la logique pour filtrer les produits par catégorie
    console.log(`Catégorie sélectionnée : ${category.name}`);
  };

  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un produit par nom, marque ou code-barres..."
        value={query}
        onChangeText={handleInputChange} // Remplacer la fonction de recherche par handleInputChange
        onSubmitEditing={handleSearch} // Permet de lancer la recherche avec la touche "Entrée"
      />
      {showSearchButton && (
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Rechercher</Text>
        </TouchableOpacity>
      )}

<<<<<<< Updated upstream:app/components/SearchBar.js
      {/* Affichage des suggestions */}
=======
      <CategoryList
        categories={categories}
        onCategoryPress={handleCategoryPress}
      />

>>>>>>> Stashed changes:flawa/components/search/SearchBar.js
      {suggestions.length > 0 && (
        <ScrollView style={styles.suggestionsContainer}>
          {suggestions.map((item) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => handleProductClick(item)}
              underlayColor="#ccc"
            >
              <Text style={styles.suggestionItem}>{item.name}</Text>
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}

      {loading && <ActivityIndicator size="large" color="#007BFF" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && filteredProducts.length > 0 && (
        <FlatList
          data={filteredProducts.slice(0, (page + 1) * 15)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} onPress={handleProductClick} />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#007BFF" />
            ) : null
          }
        />
      )}

      {!loading && !error && filteredProducts.length === 0 && query.length >= 1 && (
        <Text style={styles.noResultsText}>Aucun produit trouvé.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
<<<<<<< Updated upstream:app/components/SearchBar.js
=======
    paddingTop: "13%",
    backgroundColor: "#F7F9FC",
>>>>>>> Stashed changes:flawa/components/search/SearchBar.js
  },
  searchInput: {
    height: 50,
    borderColor: "#007BFF",
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 10,
    elevation: 2,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  suggestionsContainer: {
<<<<<<< Updated upstream:app/components/SearchBar.js
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    maxHeight: 150, // Limiter la hauteur de la liste
    marginBottom: 10,
=======
    maxHeight: 150,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
>>>>>>> Stashed changes:flawa/components/search/SearchBar.js
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default SearchBar;
