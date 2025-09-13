import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color={theme.text} onPress={() => navigation.openDrawer()} />
        <Text style={[styles.logo, { color: theme.text }]}>GET A RIDE</Text>
        <Ionicons name="notifications" size={24} color={theme.text} />
      </View>

      
      <View style={[styles.inputBox, { backgroundColor: theme.card }]}>
        <Ionicons name="location" size={20} color={theme.text} style={{ marginRight: 10 }} />
        <TextInput placeholder="Choose Starting Point" placeholderTextColor="#999" style={{ flex: 1, color: theme.text }} />
        <Ionicons name="locate" size={20} color={theme.primary} />
      </View>

      <View style={[styles.inputBox, { backgroundColor: theme.card }]}>
        <Ionicons name="pin" size={20} color={theme.text} style={{ marginRight: 10 }} />
        <TextInput placeholder="Choose Destination" placeholderTextColor="#999" style={{ flex: 1, color: theme.text }} />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("RideOptions")}
      >
        <Text style={styles.buttonText}>FIND YOUR RIDE!</Text>
      </TouchableOpacity>

      
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Saved Location</Text>
      <View style={styles.savedRow}>
        <View style={[styles.savedCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.savedTitle, { color: theme.primary }]}>Home</Text>
          <Text style={{ color: theme.text }}>Geeta Residency</Text>
        </View>
        <View style={[styles.savedCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.savedTitle, { color: theme.primary }]}>Office</Text>
          <Text style={{ color: theme.text }}>IIITV</Text>
        </View>
      </View>

      
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Visits</Text>
      <Text style={[styles.recentText,{ color: theme.text }]}>Utah University, Charlie Kirk Last Spot</Text>
      <Text style={[styles.recentText,{ color: theme.text }]}>Geeta residency, Urvasad</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginTop: 30 },
  logo: { fontSize: 20, fontWeight: "bold" },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  button: { padding: 15, borderRadius: 12, alignItems: "center", marginVertical: 15 },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  savedRow: { flexDirection: "row", justifyContent: "space-between",marginBottom: 25 },
  savedCard: { flex: 0.48, padding: 15, borderRadius: 12 },
  savedTitle: {fontSize: 18, fontWeight: "bold", marginBottom: 25 },
  recentText: { marginTop: 20,borderBottomColor:"#666",color:"#666",borderBottomWidth:1,paddingBottom:20 },
});
