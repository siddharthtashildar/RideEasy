import React, { useMemo, useRef, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import MapView, { Marker, Polyline } from "react-native-maps";
import GoogleMapsService from "../services/GoogleMapsService";
import LocationSearchInput from "../components/LocationSearchInput";
import ENVIRONMENT from "../config/environment";

export default function RideOptionsScreen({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const sheetRef = useRef(null);

  // bottom sheet snap points
  const snapPoints = useMemo(() => ["20%", "60%"], []);

  // states
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fromLocation, setFromLocation] = useState(
    route?.params?.fromLocation || ""
  );
  const [toLocation, setToLocation] = useState(route?.params?.toLocation || "");
  const [fromLocationDetails, setFromLocationDetails] = useState(
    route?.params?.fromLocationDetails || null
  );
  const [toLocationDetails, setToLocationDetails] = useState(
    route?.params?.toLocationDetails || null
  );
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeSteps, setRouteSteps] = useState([]);
  const mapRef = useRef(null);

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

  useEffect(() => {
    GoogleMapsService.getCurrentLocation().then(setCurrentLocation);
  }, []);

  useEffect(() => {
    if (fromLocationDetails && toLocationDetails) {
      const coordinates = [
        {
          latitude: fromLocationDetails.location.latitude,
          longitude: fromLocationDetails.location.longitude,
        },
        {
          latitude: toLocationDetails.location.latitude,
          longitude: toLocationDetails.location.longitude,
        },
      ];
      setRouteCoordinates(coordinates);

      // Get detailed route directions
      getRouteDirections(
        fromLocationDetails.location,
        toLocationDetails.location
      );

      // Fit map to show both locations
      fitMapToCoordinates([
        fromLocationDetails.location,
        toLocationDetails.location,
      ]);
    }
  }, [fromLocationDetails, toLocationDetails]);

  const fitMapToCoordinates = (coordinates) => {
    if (mapRef.current && coordinates.length > 0) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const getRouteDirections = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${ENVIRONMENT.GOOGLE_PLACES_API_KEY}&mode=driving&alternatives=false&avoid=tolls&units=metric`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const points = route.overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setRouteCoordinates(decodedPoints);

        // Store route information
        setRouteInfo({
          distance: route.legs[0]?.distance?.text,
          duration: route.legs[0]?.duration?.text,
          steps: route.legs[0]?.steps?.length || 0,
        });

        // Store route steps for detailed directions
        if (route.legs[0]?.steps) {
          const steps = route.legs[0].steps.map((step, index) => ({
            id: index,
            instruction: step.html_instructions.replace(/<[^>]*>/g, ""), // Remove HTML tags
            distance: step.distance?.text,
            duration: step.duration?.text,
            maneuver: step.maneuver,
          }));
          setRouteSteps(steps);
        }

        // Log route information for debugging
        console.log("Route found:", {
          distance: route.legs[0]?.distance?.text,
          duration: route.legs[0]?.duration?.text,
          steps: route.legs[0]?.steps?.length || 0,
        });
      }
    } catch (error) {
      console.error("Error getting route directions:", error);
    }
  };

  const decodePolyline = (encoded) => {
    const poly = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return poly;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ height: "80%" }}>
        <MapView
          ref={mapRef}
          style={styles.mapContainer}
          initialRegion={
            currentLocation
              ? {
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : {
                  latitude: 28.6139,
                  longitude: 77.209,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
          }
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapType="standard"
        >
          {fromLocationDetails && (
            <Marker
              coordinate={{
                latitude: fromLocationDetails.location.latitude,
                longitude: fromLocationDetails.location.longitude,
              }}
              title="Pickup Location"
              description={fromLocationDetails.name}
              pinColor="green"
            >
              <View style={styles.markerContainer}>
                <Ionicons name="location" size={24} color="#4CAF50" />
              </View>
            </Marker>
          )}

          {toLocationDetails && (
            <Marker
              coordinate={{
                latitude: toLocationDetails.location.latitude,
                longitude: toLocationDetails.location.longitude,
              }}
              title="Drop Location"
              description={toLocationDetails.name}
              pinColor="red"
            >
              <View style={styles.markerContainer}>
                <Ionicons name="flag" size={24} color="#F44336" />
              </View>
            </Marker>
          )}

          {routeCoordinates.length > 0 && (
            <>
              {/* Main route line */}
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#007AFF"
                strokeWidth={6}
                lineCap="round"
                lineJoin="round"
              />
              {/* Secondary route line for depth */}
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#FFFFFF"
                strokeWidth={4}
                lineCap="round"
                lineJoin="round"
              />
            </>
          )}
        </MapView>
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
        <BottomSheetScrollView
          style={[styles.sheetContent, { backgroundColor: theme.card }]}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Inputs */}

          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.text }]}>
              Select Your Ride
            </Text>
            <View style={styles.placeholder} />
          </View>

          <View
            style={[styles.locationCard, { backgroundColor: theme.background }]}
          >
            {/* Pickup */}
            <View style={styles.locationBlock}>
              <LocationSearchInput
                label="Pickup Point"
                placeholder="Enter pickup location"
                value={fromLocation}
                onChangeText={setFromLocation}
                onLocationSelect={setFromLocationDetails}
                theme={theme}
                showCurrentLocation={true}
              />
            </View>

            {/* Divider with Swap Button */}
            <View style={{ position: "relative", justifyContent: "center" }}>
              <View style={styles.divider} />
              <TouchableOpacity
                style={[styles.swapButton, { backgroundColor: theme.primary }]}
                onPress={() => {
                  const temp = fromLocation;
                  const tempDetails = fromLocationDetails;
                  setFromLocation(toLocation);
                  setToLocation(temp);
                  setFromLocationDetails(toLocationDetails);
                  setToLocationDetails(tempDetails);
                }}
              >
                <Ionicons name="swap-vertical" size={18} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Drop */}
            <View style={styles.locationBlock}>
              <LocationSearchInput
                label="Drop Point"
                placeholder="Enter drop location"
                value={toLocation}
                onChangeText={setToLocation}
                onLocationSelect={setToLocationDetails}
                theme={theme}
                showCurrentLocation={false}
              />
            </View>
          </View>

          {/* Route Information */}
          {routeInfo && (
            <View
              style={[
                styles.routeInfoCard,
                { backgroundColor: theme.background },
              ]}
            >
              <View style={styles.routeInfoRow}>
                <Ionicons name="navigate" size={20} color={theme.primary} />
                <Text style={[styles.routeInfoText, { color: theme.text }]}>
                  {routeInfo.distance} • {routeInfo.duration}
                </Text>
              </View>
              <View style={styles.routeInfoRow}>
                <Ionicons name="map" size={20} color={theme.primary} />
                <Text style={[styles.routeInfoText, { color: theme.text }]}>
                  {routeInfo.steps} steps
                </Text>
              </View>
            </View>
          )}

          {/* Route Steps */}
          {routeSteps.length > 0 && (
            <View
              style={[
                styles.routeStepsCard,
                { backgroundColor: theme.background },
              ]}
            >
              <Text style={[styles.routeStepsTitle, { color: theme.text }]}>
                Route Directions
              </Text>
              <BottomSheetFlatList
                data={routeSteps.slice(0, 5)} // Show first 5 steps
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.routeStepItem}>
                    <View
                      style={[
                        styles.stepNumber,
                        { backgroundColor: theme.primary },
                      ]}
                    >
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.stepContent}>
                      <Text
                        style={[styles.stepInstruction, { color: theme.text }]}
                      >
                        {item.instruction}
                      </Text>
                      {item.distance && (
                        <Text
                          style={[
                            styles.stepDistance,
                            { color: theme.textSecondary },
                          ]}
                        >
                          {item.distance}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.ExtrasButton, { backgroundColor: theme.background }]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={"time"} size={20} color={theme.primary} />
              <Text
                style={[
                  styles.ExtrasText,
                  { marginHorizontal: 10, color: theme.text },
                ]}
              >
                Now
              </Text>
            </View>

            <Ionicons
              name={"chevron-forward-outline"}
              size={20}
              color={theme.icoColor}
            />
          </TouchableOpacity>

          {/* Vehicle Cards */}
          <BottomSheetFlatList
            data={rides}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.background,
                  },
                  selectedVehicle === item.id && {
                    borderColor: theme.primary,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setSelectedVehicle(item.id)}
              >
                <View style={styles.vehicalTimeRow}>
                  <Text
                    style={[
                      styles.rideTimeText,
                      { color: theme.text, marginRight: 55 },
                    ]}
                  >
                    {item.time}
                  </Text>
                  <Ionicons
                    name="person-outline"
                    size={14}
                    color={theme.icoColor}
                  />
                  <Text style={[styles.rideTimeText, { color: theme.text }]}>
                    {item.seats}
                  </Text>
                </View>
                <Image source={item.img} style={styles.carIcon} />
                <Text style={[styles.rideName, { color: theme.text }]}>
                  {item.name}
                </Text>
                <Text style={{ color: theme.text }}>₹{item.price}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.vehicleRow}
          />

          <TouchableOpacity
            style={[styles.ExtrasButton, { backgroundColor: theme.background }]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={"cash"} size={20} color={theme.primary} />
              <Text
                style={[
                  styles.ExtrasText,
                  { marginHorizontal: 10, color: theme.text },
                ]}
              >
                Promocode
              </Text>
            </View>

            <Ionicons
              name={"chevron-forward-outline"}
              size={20}
              color={theme.icoColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ExtrasButton, { backgroundColor: theme.background }]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={"person"} size={20} color={theme.primary} />
              <Text
                style={[
                  styles.ExtrasText,
                  { marginHorizontal: 10, color: theme.text },
                ]}
              >
                Book for someone else
              </Text>
            </View>

            <Ionicons
              name={"chevron-forward-outline"}
              size={20}
              color={theme.icoColor}
            />
          </TouchableOpacity>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              if (selectedVehicle && fromLocation && toLocation) {
                navigation.navigate("Confirm", {
                  ride: selectedVehicle,
                  from: fromLocation,
                  to: toLocation,
                  fromLocationDetails: fromLocationDetails,
                  toLocationDetails: toLocationDetails,
                });
              } else {
                alert("Please fill in locations and select a ride");
              }
            }}
          >
            <Text style={styles.bookText}>BOOK NOW</Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: "100%",
  },

  sheetContent: { flex: 1, padding: 15 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  vehicleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  card: {
    width: 150,
    padding: 10,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 3,
  },
  vehicalTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  carIcon: { width: 70, height: 70, resizeMode: "contain", marginBottom: 5 },
  rideName: { fontSize: 16, fontWeight: "600" },
  rideTimeText: { fontSize: 12, fontWeight: "bold" },
  bookButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 35,
  },
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

  ExtrasButton: {
    marginTop: 5,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 3,
  },
  ExtrasText: {
    fontSize: 16,
  },
  markerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  routeInfoCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  routeInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routeInfoText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
  },
  routeStepsCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  routeStepsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  routeStepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepInstruction: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  stepDistance: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.7,
  },
});
