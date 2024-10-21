import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const ProductDetails = ({ product, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButtonTop}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        {product.images && product.images.image ? (
          <Image
            source={{ uri: product.images.image }}
            style={styles.mainImage}
          />
        ) : (
          <Text style={styles.noImageText}>Image non disponible</Text>
        )}

        <Text style={styles.title}>{product.name || "Nom non disponible"}</Text>
        <Text style={styles.brand}>
          Marque : {product.brand || "Non disponible"}
        </Text>
        {product.eans && product.eans.length > 0 ? (
          <Text style={styles.info}>Code-barres : {product.eans.join(", ")}</Text>
        ) : (
          <Text style={styles.info}>Code-barres non disponible</Text>
        )}

        {product.categories && product.categories.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Catégories</Text>
            {product.categories.map((category, index) => (
              <Text key={index} style={styles.sectionContent}>
                {category.name}
              </Text>
            ))}
          </>
        ) : (
          <Text style={styles.sectionContent}>Aucune catégorie disponible</Text>
        )}

        {product.compositions && product.compositions.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Compositions</Text>
            {product.compositions.map((composition, compIndex) => (
              <View key={compIndex} style={styles.compositionContainer}>
                <Text style={styles.compositionTitle}>
                  Composition {compIndex + 1}:
                </Text>
                {composition.ingredients && composition.ingredients.length > 0 ? (
                  composition.ingredients.map((ingredient, ingIndex) => (
                    <View key={ingIndex} style={styles.ingredientContainer}>
                      <Text style={styles.ingredientName}>
                        {ingredient.fr_name ||
                          ingredient.official_name ||
                          "Nom inconnu"}{" "}
                        ({ingredient.package_name || "Non disponible"})
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.ingredientInfo}>
                    Aucune information disponible
                  </Text>
                )}
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.sectionContent}>Aucune composition disponible</Text>
        )}

        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Retour à la recherche</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '20%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 20,
    borderColor: "#A7AEF9",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  noImageText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#4B4B4B",
  },
  brand: {
    fontSize: 18,
    marginBottom: 5,
    color: "#6C757D",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#495057",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#A7AEF9",
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 5,
    color: "#343A40",
  },
  compositionContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#A7AEF9",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  compositionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4B4B4B",
  },
  ingredientContainer: {
    marginLeft: 10,
    marginBottom: 5,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
  },
  ingredientInfo: {
    fontSize: 14,
    color: "#555",
  },
  backButton: {
    marginBottom: 40,
    backgroundColor: "#A7AEF9",
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButtonTop: {
    marginBottom: 10,
    backgroundColor: "#A7AEF9",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetails;