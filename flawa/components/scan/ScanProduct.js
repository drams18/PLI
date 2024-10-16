import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { Camera } from 'expo-camera';

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Demande de permission pour la caméra
  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  // Fonction appelée lors du scan du code-barres
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert('Code-barres scanné', `Type: ${type}\nData: ${data}`);
  };

  // Fonction pour démarrer le scan
  const startScanning = () => {
    setIsScanning(true);
    setScanned(false);
  };

  // Affichage en fonction des permissions
  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Demande de permission pour accéder à la caméra...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Accès à la caméra refusé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <Camera
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.scannerOverlay}>
            {scanned && (
              <View style={styles.buttonContainer}>
                <Text style={styles.text}>Scanné avec succès !</Text>
                <Button title="Scanner à nouveau" onPress={() => setScanned(false)} />
              </View>
            )}
          </View>
        </Camera>
      ) : (
        <Button title="Scanner un produit" onPress={startScanning} />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default BarcodeScanner;