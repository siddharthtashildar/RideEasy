import React, { useCallback, useMemo, useRef, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default function RideOptions({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const screenHeight = Dimensions.get("window").height;
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(screenHeight * 0.45)).current; // 45% initially

  const rides = [
    { id: "standard", name: "Standard", time: "7 Mins", seats: 4, price: 120, img: require("../assets/Vehicles/Standard.png") },
    { id: "premium", name: "Premium", time: "5 Mins", seats: 4, price: 220, img: require("../assets/Vehicles/Sedan.png") },
    { id: "suv", name: "SUV", time: "10 Mins", seats: 6, price: 320, img: require("../assets/Vehicles/SUV.png") },
  ];

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? screenHeight * 0.45 : screenHeight * 0.8, // 45% or 80%
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.map}>
        <Text style={{ color: theme.text }}>MAP COMES HERE</Text>
      </View>

      <View style={[styles.content, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Select Your Ride</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.vehicleRow}>
            {rides.map((ride) => (
              <TouchableOpacity
                key={ride.id}
                style={[
                  styles.card,
                  selectedVehicle === ride.id && {
                    borderColor: theme.primary,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setSelectedVehicle(ride.id)}
              >
                <View style={styles.timeRow}>
                  <Text style={[styles.time, { color: theme.text, marginRight: 55 }]}>{ride.time}</Text>
                  <Ionicons name="person-outline" size={14} color={theme.icoColor} />
                  <Text style={[styles.time, { color: theme.text }]}>{ride.seats}</Text>
                </View>
                <Image source={ride.img} style={styles.carIcon} />
                <Text style={[styles.rideName, { color: theme.text }]}>{ride.name}</Text>
                <Text style={{ color: theme.text }}>₹{ride.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: theme.primary }]}
          onPress={() =>
            selectedVehicle
              ? navigation.navigate("Confirm", { ride: selectedVehicle })
              : alert("Please select a ride first")
          }
        >
          <Text style={styles.bookText}>BOOK NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { flex: 1, padding: 20, borderRadius: 20, marginHorizontal: 5 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  vehicleRow: { flexDirection: "row", justifyContent: "space-between", padding: 20 },
  card: { width: 150, padding: 10, borderRadius: 12, borderColor: "#ddd", borderWidth: 2, alignItems: "center", padding: 10, marginHorizontal: 10 },
  timeRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  carIcon: { width: 70, height: 70, resizeMode: "contain", marginBottom: 5 },
  rideName: { fontSize: 16, fontWeight: "600" },
  time: { fontSize: 12, fontWeight: "bold" },
  bookButton: { marginTop: 20, paddingVertical: 12, borderRadius: 10, alignItems: "center", marginBottom: 35 },
  bookText: { color: "#000", fontSize: 16, fontWeight: "bold" },
});
