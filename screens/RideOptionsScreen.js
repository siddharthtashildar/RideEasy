import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function RideOptionsScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Select Your Ride</Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate("Confirm")}
      >
        <Text style={[styles.rideText, { color: theme.text }]}>🚖 Standard Taxi</Text>
        <Text style={{ color: theme.primary }}>₹120</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate("Confirm")}
      >
        <Text style={[styles.rideText, { color: theme.text }]}>🚘 Premium Sedan</Text>
        <Text style={{ color: theme.primary }}>₹220</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate("Confirm")}
      >
        <Text style={[styles.rideText, { color: theme.text }]}>🚐 SUV</Text>
        <Text style={{ color: theme.primary }}>₹300</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center",marginTop: 30 },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  rideText: { fontSize: 18, fontWeight: "600" },
});
