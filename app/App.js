// import React, { useState } from "react";
// import { StyleSheet, View, Button } from "react-native";
// import SearchBar from "./components/search/SearchBar";
// import AddProduct from "./components/addProduct/addProduct";
// import HomePage from "./components/home/HomePage";

// export default function App() {
//   const [currentPage, setCurrentPage] = useState("addProduct");

//   const renderPage = () => {
//     switch (currentPage) {
//       case "search":
//         return <SearchBar />;
//       case "addProduct":
//         return <AddProduct />;
//       default:
//         return <HomePage />;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Rechercher un produit"
//           onPress={() => setCurrentPage("search")}
//         />
//         <Button
//           title="Ajouter un produit"
//           onPress={() => setCurrentPage("addProduct")}
//         />
//       </View>

//       {renderPage()}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: "20%",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
// });

import React from "react";
import HomePage from "./components/home/HomePage";

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;

