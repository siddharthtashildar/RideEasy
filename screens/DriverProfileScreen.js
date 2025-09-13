import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function DriverProfileScreen() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Your Driver</Text>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Image
          source={{ uri: "" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: theme.text }]}>Mr. Baburou</Text>
          <Text style={{ color: theme.text }}>Car: Maruti Omni</Text>
          <Text style={{ color: theme.text }}>Reg No: GJ-01-VP-6969</Text>
          <Text style={{ color: theme.primary }}>+91 98769 54321</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]}>
        <Text style={styles.buttonText}>Start Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center",marginTop: 30 },
  card: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  button: { padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
