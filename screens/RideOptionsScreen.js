import React, { useMemo, useRef, useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";

export default function RideOptionsScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const sheetRef = useRef(null);

  // bottom sheet snap points
  const snapPoints = useMemo(() => ["45%", "85%"], []);

  // states
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const rides = [
    { id: "standard", name: "Standard", time: "7 Mins", seats: 4, price: 120, img: require("../assets/Vehicles/Standard.png") },
    { id: "premium", name: "Premium", time: "5 Mins", seats: 4, price: 220, img: require("../assets/Vehicles/Sedan.png") },
    { id: "suv", name: "SUV", time: "10 Mins", seats: 6, price: 320, img: require("../assets/Vehicles/SUV.png") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Placeholder Map */}
      <View style={styles.mapContainer}>
        <Text style={[styles.mapText, { color: theme.text }]}>MAP COMES HERE</Text>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.card }}
        handleIndicatorStyle={{ backgroundColor: theme.text }}
        style={{ marginHorizontal: 5, borderRadius: 20, overflow: "hidden" }}
      >
        <BottomSheetView style={[styles.sheetContent, { backgroundColor: theme.card }]}>
          {/* Inputs */}

          <Text style={[styles.title, { color: theme.text }]}>Select Your Ride</Text>

          <View style={[styles.locationCard, { backgroundColor: theme.background }]}>
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







          {/* Vehicle Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.vehicleRow}>
              {rides.map((ride) => (
                <TouchableOpacity
                  key={ride.id}
                  style={[
                    styles.card,
                    { backgroundColor: theme.background, borderColor: theme.background },
                    selectedVehicle === ride.id && { borderColor: theme.primary, borderWidth: 2 },
                  ]}
                  onPress={() => setSelectedVehicle(ride.id)}
                >
                  <View style={styles.vehicalTimeRow}>
                    <Text style={[styles.rideTimeText, { color: theme.text, marginRight: 55 }]}>{ride.time}</Text>
                    <Ionicons name="person-outline" size={14} color={theme.icoColor} />
                    <Text style={[styles.rideTimeText, { color: theme.text }]}>{ride.seats}</Text>
                  </View>
                  <Image source={ride.img} style={styles.carIcon} />
                  <Text style={[styles.rideName, { color: theme.text }]}>{ride.name}</Text>
                  <Text style={{ color: theme.text }}>₹{ride.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              if (selectedVehicle && fromLocation && toLocation) {
                navigation.navigate("Confirm", { ride: selectedVehicle, from: fromLocation, to: toLocation });
              } else {
                alert("Please fill in locations and select a ride");
              }
            }}
          >
            <Text style={styles.bookText}>BOOK NOW</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  mapText: { fontSize: 18, fontWeight: "bold" },

  sheetContent: { flex: 1, padding: 15 },


  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  vehicleRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  card: {
    width: 150,
    padding: 10,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 3,
  },
  vehicalTimeRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  carIcon: { width: 70, height: 70, resizeMode: "contain", marginBottom: 5 },
  rideName: { fontSize: 16, fontWeight: "600" },
  rideTimeText: { fontSize: 12, fontWeight: "bold" },
  bookButton: { marginTop: 20, paddingVertical: 12, borderRadius: 10, alignItems: "center", marginBottom: 35 },
  bookText: { color: "#000", fontSize: 16, fontWeight: "bold" },

  locationCard: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
  },

  locationBlock: {
    paddingVertical: 8,
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
    marginVertical: 8,
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
