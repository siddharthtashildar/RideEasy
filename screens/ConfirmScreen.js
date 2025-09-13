import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ConfirmScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Confirm Your Ride</Text>

      <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.info, { color: theme.text }]}>Pickup: IIITV</Text>
        <Text style={[styles.info, { color: theme.text }]}>Destination: GR1</Text>
        <Text style={{ color: theme.primary, fontWeight: "bold" }}>Estimated Fare: ₹220</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("DriverProfile")}
      >
        <Text style={styles.buttonText}>Confirm & Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center",marginTop: 30 },
  infoCard: { padding: 20, borderRadius: 12, marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 8 },
  button: { padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
