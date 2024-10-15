import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import SearchBar from "../search/SearchBar";
import AddProduct from "../addProduct/addProduct";
import ScanProduct from "../scan/ScanProduct"

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "search":
        return <SearchBar />;
      case "add":
        return <AddProduct />;
      case "scan":
        return <ScanProduct />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>FLAWA</Text>
      <View style={styles.buttonContainer}>
        <Button title="RECHERCHE" onPress={() => setCurrentPage("search")} />
        <Button title="DEMANDE D'AJOUT" onPress={() => setCurrentPage("add")} />
        <Button title="SCANNER" onPress={() => setCurrentPage("scan")} />
      </View>

      <View>{renderPage()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});

export default HomePage;
