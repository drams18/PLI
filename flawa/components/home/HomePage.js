import React from "react";
import { View, StyleSheet } from "react-native";
import ProductHomePage from "./ProductsHomePage";

const MainView = () => {
  return (
    <View style={styles.container}>
      <ProductHomePage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A7AEF9",
    justifyContent: "center",
    paddingTop: 20,
  },
});

export default MainView;
