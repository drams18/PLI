import { StyleSheet, View } from 'react-native';
import SearchBar from './components/search/SearchBar';
import AddProduct from './components/addProduct/addProduct'; 
import { storage } from './firebaseConfig';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SearchBar/> */}
      <AddProduct/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
  },
});
