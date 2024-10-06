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
    <ScrollView style={styles.container}>
      {product.images && product.images.image ? (
        <Image source={{ uri: product.images.image }} style={styles.mainImage} />
      ) : (
        <Text style={styles.noImageText}>Image non disponible</Text>
      )}

      <Text style={styles.title}>{product.name || "Nom non disponible"}</Text>
      <Text style={styles.brand}>Marque : {product.brand || "Non disponible"}</Text>
      <Text style={styles.info}>ID : {product.id || "Non disponible"}</Text>
      {product.eans && product.eans.length > 0 ? (
        <Text style={styles.info}>Code-barres : {product.eans.join(", ")}</Text>
      ) : (
        <Text style={styles.info}>Code-barres non disponible</Text>
      )}
      <Text style={styles.info}>
        Score de validation : {product.validation_score || "Non disponible"}
      </Text>
      <Text style={styles.info}>Score : {product.score || "Non disponible"}</Text>

      {/* Affichage des catégories */}
      {product.categories && product.categories.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Catégories</Text>
          {product.categories.map((category, index) => (
            <Text key={index} style={styles.sectionContent}>
              {category.name} (Profondeur: {category.depth || "N/A"})
            </Text>
          ))}
        </>
      ) : (
        <Text style={styles.sectionContent}>Aucune catégorie disponible</Text>
      )}

      {/* Affichage des compositions */}
      {product.compositions && product.compositions.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Compositions</Text>
          {product.compositions.map((composition, compIndex) => (
            <View key={compIndex} style={styles.compositionContainer}>
              <Text style={styles.compositionTitle}>
                Composition {compIndex + 1}:
              </Text>
              {composition.ingredients &&
                composition.ingredients.length > 0 ? (
                composition.ingredients.map((ingredient, ingIndex) => (
                  <View key={ingIndex} style={styles.ingredientContainer}>
                    <Text style={styles.ingredientName}>
                      {ingredient.fr_name ||
                        ingredient.official_name ||
                        "Nom inconnu"}{" "}
                      ({ingredient.package_name || "Non disponible"})
                    </Text>
                    <Text style={styles.ingredientInfo}>
                      Score : {ingredient.score || "Non disponible"}
                    </Text>
                    {ingredient.families && ingredient.families.length > 0 && (
                      <Text style={styles.ingredientInfo}>
                        Famille :{" "}
                        {ingredient.families
                          .map((fam) => fam.name)
                          .join(", ")}
                      </Text>
                    )}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  brand: {
    fontSize: 18,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  compositionContainer: {
    marginBottom: 15,
  },
  compositionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredientContainer: {
    marginLeft: 10,
    marginBottom: 5,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "600",
  },
  ingredientInfo: {
    fontSize: 14,
    color: "#555",
  },
  backButton: {
    marginBottom: 40,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProductDetails;
