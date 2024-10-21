import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";

const ProductHomePage = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(
      "https://produits-beaute-api.s3.eu-west-3.amazonaws.com/products_cut_1.json"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);

  const handleSearch = () => {
    if (!query) return;

    const results = products.filter((product) => {
      const matchesName =
        product.name && product.name.toLowerCase().includes(query.toLowerCase());
      const matchesBrand =
        product.brand && product.brand.toLowerCase().includes(query.toLowerCase());
      return matchesName || matchesBrand;
    });

    setFilteredProducts(results);
  };

  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const matches = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(text.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(text.toLowerCase()))
        );
      });
      setSuggestions(matches.slice(0, 7));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Recherche produit par nom ou marque"
            style={styles.searchInput}
            value={query}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>

        {suggestions.length > 0 && (
          <ScrollView style={styles.suggestionsContainer}>
            {suggestions.map((item) => (
              <TouchableHighlight
                key={item.id}
                onPress={() => {
                  setQuery(item.name);
                  handleSearch();
                  setSuggestions([]);
                }}
                underlayColor="#ccc"
              >
                <Text style={styles.suggestionItem}>{item.name}</Text>
              </TouchableHighlight>
            ))}
          </ScrollView>
        )}

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.productsContainer}>
          {filteredProducts.map((product, index) => (
            <View key={index} style={styles.productCard}>
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.productNote}>{product.score}/20</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Diagnostic</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#A7AEF9",
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  productsContainer: {
    marginTop: 20,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  productNote: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    maxHeight: 150,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ProductHomePage;
