import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";

const ProductDetails = ({ product, onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images.image }} style={styles.mainImage} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.brand}>Marque : {product.brand}</Text>
      <Text style={styles.info}>ID : {product.id}</Text>
      <Text style={styles.info}>Code-barres : {product.eans.join(", ")}</Text>
      <Text style={styles.info}>Score de validation : {product.validation_score}</Text>
      <Text style={styles.info}>Score : {product.score}</Text>

      <Text style={styles.sectionTitle}>Catégories</Text>
      {product.categories.map((category, index) => (
        <Text key={index} style={styles.sectionContent}>
          {category.name} (Profondeur: {category.depth})
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Compositions</Text>
      {product.compositions.map((composition, compIndex) => (
        <View key={compIndex} style={styles.compositionContainer}>
          <Text style={styles.compositionTitle}>Composition {compIndex + 1}:</Text>
          {composition.ingredients.map((ingredient, ingIndex) => (
            <View key={ingIndex} style={styles.ingredientContainer}>
              <Text style={styles.ingredientName}>
                {ingredient.fr_name || ingredient.official_name} ({ingredient.package_name})
              </Text>
              <Text style={styles.ingredientInfo}>Score : {ingredient.score}</Text>
              {ingredient.families && ingredient.families.length > 0 && (
                <Text style={styles.ingredientInfo}>
                  Famille : {ingredient.families.map(fam => fam.name).join(", ")}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}

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
    marginTop: 30,
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
