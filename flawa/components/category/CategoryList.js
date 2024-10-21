// CategoryList.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.categoryCard}>
    <Icon name={category.icon} size={30} color="#007BFF" style={styles.icon} />
    <Text style={styles.categoryCardText}>{category.name}</Text>
  </TouchableOpacity>
);

const CategoryList = ({ categories, navigation }) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onPress={() => navigation.navigate('CategoryProducts', { category })}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  categoryCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  categoryCardText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  icon: {
  },
});

export default CategoryList;