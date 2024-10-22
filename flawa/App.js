import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/home/HomePage";
import SearchScreen from "./components/search/SearchBar";
import Auth from "./components/screens/Auth";
import ScanProduct from "./components/scan/CameraScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { ProductProvider } from "./api/ProductContext";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ProductProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#A7AEF9",
                borderTopColor: "#A7AEF9",
                borderTopWidth: 1,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="search-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Auth"
              component={Auth} // Utilisez le composant Auth ici
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="pricetag-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Scan"
              component={ScanProduct}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="scan-outline" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </ProductProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A7AEF9",
  },
});

export default App;
