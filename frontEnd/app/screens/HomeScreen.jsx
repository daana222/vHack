import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Angelina Jolie</Text>
      </View>

      {/* Blood Sugar Level Container */}
      <View style={styles.bloodSugarContainer}>
        <Text style={styles.sectionTitle}>Blood Sugar Level</Text>
        <Text style={styles.bloodSugarValue}>97</Text>
      </View>

      {/* Blood Group & Weight Containers */}
      <View style={styles.rowContainer}>
        <View style={styles.infoBox}>
          <Icon name="droplet" size={30} color="#C68DFF" />
          <Text style={styles.infoTitle}>Blood Group</Text>
          <Text style={styles.infoValue}>A+</Text>
        </View>

        <View style={styles.infoBox}>
          <Icon name="activity" size={30} color="#C68DFF" />
          <Text style={styles.infoTitle}>Weight</Text>
          <Text style={styles.infoValue}>65 Kg</Text>
        </View>
      </View>

      {/* Chat with Durry Container */}
      <TouchableOpacity 
        style={styles.durryContainer}
        onPress={() => navigation.navigate('ChatWithDurry')} // Add this line
      >
        <Image
          source={require("../../assets/images/durry.png")}
          style={styles.durryImage}
        />
        <Text style={styles.durryText}>Chat with Durry</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4D0F8",
    alignItems: "center",
    paddingTop: 40,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CFABF3",
    padding: 15,
    borderRadius: 15,
    width: "90%",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  bloodSugarContainer: {
    backgroundColor: "#C68DFF",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  bloodSugarValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#CFABF3",
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  durryContainer: {
    backgroundColor: "#CFABF3",
    padding: 15,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  durryImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  durryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;