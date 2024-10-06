import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(product)}>
      {product.images && product.images.thumbnail ? (
        <Image source={{ uri: product.images.thumbnail }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <Text style={styles.name}>{product.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: "contain",
  },
  placeholder: {
    width: 80,
    height: 80,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  placeholderText: {
    color: "#888",
    fontSize: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductItem;
