import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import HomePage from './components/home/HomePage';
import SearchBar from './components/search/SearchBar';
import AddProduct from './components/addProduct/addProduct';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchBar />;
      case 'addProduct':
        return <AddProduct />;
      default:
        return <HomePage />;
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
