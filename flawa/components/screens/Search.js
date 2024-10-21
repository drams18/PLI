import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchProduct from '../search/SearchBar';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <SearchProduct />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;