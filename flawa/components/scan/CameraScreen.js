import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductDetails from '../search/ProductDetails';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [products, setProducts] = useState([]);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      await fetchProducts();
    })();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://produits-beaute-api.s3.eu-west-3.amazonaws.com/products_cut_1.json');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur lors de la récupération des produits");
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert('Code scanné avec succès!', data);

    const cleanedBarcode = data.replace(/\s+/g, '').trim();
    console.log(`Code-barres nettoyé: ${cleanedBarcode}`);

    const product = products.find(item => item.eans.includes(cleanedBarcode));

    console.log(`Produit trouvé dans la liste: ${JSON.stringify(product?.name, null, 2)}`);

    if (product) {
      console.log(`Produit trouvé : ${JSON.stringify(product, null, 2)}`);
      setScannedProduct(product);
    } else {
      console.log('Produit non trouvé');
      Alert.alert('Produit non trouvé', 'Aucun produit ne correspond à ce code-barres.');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Aucune permission d'accès à la caméra</Text>;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des produits...</Text>
      </View>
    );
  }

  if (scannedProduct) {
    return (
      <ProductDetails
        product={scannedProduct}
        onBack={() => {
          setScannedProduct(null);
          setScanned(false);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && scannedProduct && (
        <View style={styles.scannedProductContainer}>
          {scannedProduct.images && scannedProduct.images.length > 0 ? (
            <Image
              source={{ uri: scannedProduct.images[0].image }}
              style={styles.productImage}
            />
          ) : (
            <Text>Aucune image disponible</Text>
          )}
          <Text style={styles.scannedText}>Produit scanné : {scannedProduct.name}</Text>
          <Text style={styles.brandText}>Marque : {scannedProduct.brand}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#A7AEF9",
  },
  scannedProductContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  scannedText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandText: {
    fontSize: 16,
    color: '#555',
  },
});

export default CameraScreen;
