import React, { useMemo, useRef, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default function RideOptionsScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const sheetRef = useRef(null);

  // bottom sheet snap points: 40% and full height
  const snapPoints = useMemo(() => ["40%", "80%"], []);

  // selected vehicle state
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const rides = [
    {
      id: "standard",
      name: "Standard",
      time: "7 Mins",
      seats: 4,
      price: 120,
      img: require("../assets/Vehicles/Standard.png"),
    },
    {
      id: "premium",
      name: "Premium",
      time: "5 Mins",
      seats: 4,
      price: 220,
      img: require("../assets/Vehicles/Sedan.png"),
    },
    {
      id: "suv",
      name: "SUV",
      time: "10 Mins",
      seats: 6,
      price: 320,
      img: require("../assets/Vehicles/SUV.png"),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Placeholder Map */}
      <View style={styles.mapContainer}>
        <Text style={[styles.mapText, { color: theme.text }]}>MAP COMES HERE</Text>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints}>
        <View style={[styles.sheetContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.title, { color: theme.text }]}>Select Your Ride</Text>

          <View style={styles.vehicleRow}>
            {rides.map((ride) => (
              <TouchableOpacity
                key={ride.id}
                style={[
                  styles.card,
                  { backgroundColor: theme.card },
                  selectedVehicle === ride.id && {
                    borderColor: theme.primary,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setSelectedVehicle(ride.id)}
              >
                <View style={styles.vehicalTime}>
                  <Text style={[styles.rideTimeText, { color: theme.text, marginRight: 55 }]}>
                    {ride.time}
                  </Text>
                  <Ionicons name="person-outline" size={14} color={theme.icoColor} />
                  <Text style={[styles.rideTimeText, { color: theme.text }]}>
                    {ride.seats}
                  </Text>
                </View>

                <Image source={ride.img} style={styles.carIcon} />
                <Text style={[styles.rideText, { color: theme.text }]}>{ride.name}</Text>
                <Text style={{ color: theme.text }}>₹{ride.price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => {
              if (selectedVehicle) {
                navigation.navigate("Confirm", { ride: selectedVehicle });
              } else {
                alert("Please select a ride first");
              }
            }}
          >
            <Text style={styles.buttonText}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  mapText: { fontSize: 20, fontWeight: "bold" },
  sheetContent: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  vehicleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: 120,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  carIcon: { width: 70, height: 70, resizeMode: "contain", marginBottom: 5 },
  vehicalTime: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  rideText: { fontSize: 16, fontWeight: "600" },
  rideTimeText: { fontSize: 12, fontWeight: "bold" },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
