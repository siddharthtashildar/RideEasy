import React, { useMemo, useRef, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={styles.header}>

        <Ionicons name="menu" size={28} color={theme.text} onPress={() => navigation.openDrawer()} />
        <Text style={[styles.logo, { color: theme.text }]}>RideEasy</Text>
        <Ionicons name="notifications" size={24} color={theme.text} />
      </View>

      <Text style={[styles.nameTitle, { color: theme.text, fontFamily: 'Poppins-Bold'}]}>Hi Niggachu!</Text>
      <Text style={[styles.nameTitleSmol, { color: theme.text }]}>Where would you like to go?</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      <View style={styles.savedRow}>

          <TouchableOpacity style={[styles.savedButton, { backgroundColor: theme.primary }]}>
        <Text style={[styles.savedTitle , { color: "#000" }]}>+ Add</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.savedButton, { backgroundColor: theme.card }]}>
        <Text style={[styles.savedTitle , { color: theme.text }]}>Home</Text>
      </TouchableOpacity>

            <TouchableOpacity style={[styles.savedButton, { backgroundColor: theme.card }]}>
        <Text style={[styles.savedTitle , { color: theme.text }]}>Office</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.savedButton, { backgroundColor: theme.card }]}>
        <Text style={[styles.savedTitle , { color: theme.text }]}>Gym</Text>
      </TouchableOpacity>

            <TouchableOpacity style={[styles.savedButton, { backgroundColor: theme.card }]}>
        <Text style={[styles.savedTitle , { color: theme.text }]}>Coffee</Text>
      </TouchableOpacity>

      </View>

      </ScrollView>


      <View style={[styles.locationCard, { backgroundColor: theme.card }]}>
        {/* Pickup */}
        <View style={styles.locationBlock}>
          <Text style={[styles.label, { color: theme.text }]}>Pickup Point</Text>
          <TextInput
            placeholder="Enter pickup location"
            placeholderTextColor="#999"
            style={[styles.locationInput, { color: theme.text }]}
            value={fromLocation}
            onChangeText={setFromLocation}
          />
        </View>

        {/* Divider with Swap Button */}
        <View style={{ position: "relative", justifyContent: "center" }}>
          <View style={styles.divider} />
          <TouchableOpacity
            style={[styles.swapButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              const temp = fromLocation;
              setFromLocation(toLocation);
              setToLocation(temp);
            }}
          >
            <Ionicons name="swap-vertical" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Drop */}
        <View style={styles.locationBlock}>

          <Text style={[styles.label, { color: theme.text }]}>Drop Point</Text>
          <TextInput
            placeholder="Enter drop location"
            placeholderTextColor="#999"
            style={[styles.locationInput, { color: theme.text }]}
            value={toLocation}
            onChangeText={setToLocation}
          />
        </View>

      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("RideOptions")}
      >
        <Text style={styles.buttonText}>FIND YOUR RIDE!</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Services</Text>



      <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Visits</Text>
      <Text style={[styles.recentText, { color: theme.text }]}>Utah University, Charlie Kirk Last Spot</Text>
      <Text style={[styles.recentText, { color: theme.text }]}>Geeta residency, Urvasad</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5, marginTop: 30 },
  logo: { fontSize: 20, fontWeight: "bold" },

  
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 60, marginBottom: 15 },
  savedRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25,paddingHorizontal:5,marginHorizontal:-5,marginTop:0, },
  savedCard: { flex: 0.48, width: 150,marginHorizontal:10, padding: 15, borderRadius: 12, elevation: 3, },
  savedTitle: { fontSize: 16},
  recentText: { marginTop: 20, borderBottomColor: "#666", color: "#666", borderBottomWidth: 1, paddingBottom: 20 },
  nameTitle: { fontSize: 32, fontWeight: "bold", marginTop: 20 },
  nameTitleSmol: { fontSize: 16, marginTop: 5, marginBottom: 20, color: "#666" },
  savedButton: {borderRadius:16, alignItems: "center", width:70, paddingVertical:6, elevation:3, marginHorizontal:6, marginTop:10, },

  button: { 
    paddingVertical: 12, 
    borderBottomLeftRadius: 16, 
    borderBottomRightRadius: 16, 
    alignItems: "center", 
    paddingHorizontal: 15, 
    elevation: 3, 
    marginHorizontal:-.25,
  },

  locationCard: {
    // borderRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 0,
    elevation: 3,
  },

  locationBlock: {
    paddingVertical: 2,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    opacity: 0.7,
  },

  locationInput: {
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#444", // adjust for theme
    marginVertical: 10,
  },

  swapButton: {
    position: "absolute",
    right: 10,
    alignSelf: "center",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
