import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage, firestore } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [barcode, setBarcode] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [ingredientsImage, setIngredientsImage] = useState(null);
  const [loading, setLoading] = useState(false); // chargement page
  const [notification, setNotification] = useState(null); // notif

  const selectImage = async (setImage) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission d'accéder à la galerie est requise.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handleSendData = async () => {
    try {
      if (
        !productName ||
        !productBrand ||
        !barcode ||
        !productImage ||
        !ingredientsImage
      ) {
        Alert.alert(
          "Erreur",
          "Veuillez remplir tous les champs et fournir les images."
        );
        return;
      }

      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        Alert.alert("Erreur", "Aucune connexion Internet.");
        return;
      }

      setLoading(true);

      const productImageRef = ref(
        storage,
        `images/products/${productBrand}.${productName}.${barcode}.${Date.now()}.jpg`
      );
      const ingredientsImageRef = ref(
        storage,
        `images/ingredients/${productBrand}.${productName}.${barcode}.${Date.now()}.jpg`
      );

      const productImageResponse = await fetch(productImage);
      if (!productImageResponse.ok) {
        throw new Error("Erreur lors de la récupération de l'image du produit");
      }
      const productImageBlob = await productImageResponse.blob();
      await uploadBytes(productImageRef, productImageBlob);

      const ingredientsImageResponse = await fetch(ingredientsImage);
      if (!ingredientsImageResponse.ok) {
        throw new Error(
          "Erreur lors de la récupération de l'image des ingrédients"
        );
      }
      const ingredientsImageBlob = await ingredientsImageResponse.blob();
      await uploadBytes(ingredientsImageRef, ingredientsImageBlob);

      const productImageUrl = await getDownloadURL(productImageRef);
      const ingredientsImageUrl = await getDownloadURL(ingredientsImageRef);

      const productData = {
        productName,
        productBrand,
        barcode,
        productImageUrl,
        ingredientsImageUrl,
      };

      const productDocRef = doc(firestore, "products", barcode);
      await setDoc(productDocRef, productData);

      Alert.alert(
        "Succès",
        "Les données du produit ont été enregistrées avec succès !"
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l'envoi des données. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nom du produit</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Entrez le nom du produit"
        placeholderTextColor="#C5AE96"
      />

      <Text style={styles.label}>Marque du produit</Text>
      <TextInput
        style={styles.input}
        value={productBrand}
        onChangeText={setProductBrand}
        placeholder="Entrez la marque du produit"
        placeholderTextColor="#C5AE96"
      />

      <Text style={styles.label}>Code-barres du produit</Text>
      <TextInput
        style={styles.input}
        value={barcode}
        onChangeText={setBarcode}
        placeholder="Entrez le code-barres du produit"
        placeholderTextColor="#C5AE96"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Photo du produit</Text>
      {productImage ? (
        <Image source={{ uri: productImage }} style={styles.image} />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => selectImage(setProductImage)}
        >
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Photo des ingrédients</Text>
      {ingredientsImage ? (
        <Image source={{ uri: ingredientsImage }} style={styles.image} />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => selectImage(setIngredientsImage)}
        >
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSendData}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Envoyer</Text>
        )}
      </TouchableOpacity>

      {notification && (
        <Text style={styles.notificationText}>{notification}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#863B0A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C5AE96",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#FFF3E3",
    color: "#000",
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#ECAD7C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#C96A25",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  notificationText: {
    fontSize: 16,
    color: "#C96A25",
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
});

export default AddProduct;
