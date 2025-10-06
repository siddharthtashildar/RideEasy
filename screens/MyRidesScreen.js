import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default function MyRidesScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  // Mock data for rides - in a real app, this would come from your backend/state management
  const [rides] = useState([
    {
      id: "1",
      status: "Confirmed",
      statusColor: "#4CAF50",
      time: "2:30 PM",
      date: "Today",
      from: "Central Park, New York",
      to: "Times Square, New York",
      vehicle: "Standard",
      fare: "₹120",
      eta: "7 mins",
      driver: {
        name: "John Doe",
        rating: 4.8,
        rides: "2,500+",
        phone: "+91 98765 43210",
      },
    },
    {
      id: "2",
      status: "Completed",
      statusColor: "#2196F3",
      time: "11:45 AM",
      date: "Yesterday",
      from: "Airport Terminal 1",
      to: "Downtown Hotel",
      vehicle: "Premium",
      fare: "₹220",
      eta: "Completed",
      driver: {
        name: "Mike Johnson",
        rating: 4.9,
        rides: "3,200+",
        phone: "+91 98765 43211",
      },
    },
    {
      id: "3",
      status: "Cancelled",
      statusColor: "#F44336",
      time: "9:15 AM",
      date: "2 days ago",
      from: "Shopping Mall",
      to: "City Center",
      vehicle: "SUV",
      fare: "₹320",
      eta: "Cancelled",
      driver: {
        name: "Sarah Wilson",
        rating: 4.7,
        rides: "1,800+",
        phone: "+91 98765 43212",
      },
    },
  ]);

  const renderRideItem = ({ item }) => (
    <View style={[styles.rideCard, { backgroundColor: theme.card }]}>
      {/* Ride Header */}
      <View style={styles.rideHeader}>
        <View style={styles.rideStatus}>
          <View
            style={[styles.statusDot, { backgroundColor: item.statusColor }]}
          />
          <Text style={[styles.statusText, { color: item.statusColor }]}>
            {item.status}
          </Text>
        </View>
        <View style={styles.rideTimeInfo}>
          <Text style={[styles.rideTime, { color: theme.text }]}>
            {item.time}
          </Text>
          <Text style={[styles.rideDate, { color: theme.textSecondary }]}>
            {item.date}
          </Text>
        </View>
      </View>

      {/* Route Information */}
      <View style={styles.rideRoute}>
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: "#4CAF50" }]} />
          <Text style={[styles.routeText, { color: theme.text }]}>
            {item.from}
          </Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <View style={[styles.routeDot, { backgroundColor: "#F44336" }]} />
          <Text style={[styles.routeText, { color: theme.text }]}>
            {item.to}
          </Text>
        </View>
      </View>

      {/* Ride Details */}
      <View style={styles.rideDetails}>
        <View style={styles.rideInfo}>
          <Text style={[styles.rideLabel, { color: theme.textSecondary }]}>
            Vehicle
          </Text>
          <Text style={[styles.rideValue, { color: theme.text }]}>
            {item.vehicle}
          </Text>
        </View>
        <View style={styles.rideInfo}>
          <Text style={[styles.rideLabel, { color: theme.textSecondary }]}>
            Fare
          </Text>
          <Text style={[styles.rideValue, { color: theme.primary }]}>
            {item.fare}
          </Text>
        </View>
        <View style={styles.rideInfo}>
          <Text style={[styles.rideLabel, { color: theme.textSecondary }]}>
            ETA
          </Text>
          <Text style={[styles.rideValue, { color: theme.text }]}>
            {item.eta}
          </Text>
        </View>
      </View>

      {/* Driver Information */}
      <View style={styles.driverSection}>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Ionicons name="person" size={20} color={theme.primary} />
          </View>
          <View style={styles.driverDetails}>
            <Text style={[styles.driverName, { color: theme.text }]}>
              {item.driver.name}
            </Text>
            <Text style={[styles.driverRating, { color: theme.textSecondary }]}>
              ⭐ {item.driver.rating} • {item.driver.rides} rides
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.phoneButton}>
          <Ionicons name="call" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {item.status === "Confirmed" && (
          <TouchableOpacity
            style={[styles.trackButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              // Navigate to tracking screen
              console.log("Track ride:", item.id);
            }}
          >
            <Text style={styles.trackButtonText}>Track Ride</Text>
          </TouchableOpacity>
        )}

        {item.status === "Completed" && (
          <TouchableOpacity
            style={[styles.rateButton, { borderColor: theme.primary }]}
            onPress={() => {
              // Navigate to rating screen
              console.log("Rate ride:", item.id);
            }}
          >
            <Text style={[styles.rateButtonText, { color: theme.primary }]}>
              Rate Ride
            </Text>
          </TouchableOpacity>
        )}

        {item.status === "Cancelled" && (
          <TouchableOpacity
            style={[styles.bookAgainButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.bookAgainButtonText}>Book Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          My Rides
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Rides List */}
      <FlatList
        data={rides}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    marginBottom: 10,
  },
  backButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  listContainer: {
    padding: 20,
    paddingTop: 20,
  },
  rideCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  rideStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  rideTimeInfo: {
    alignItems: "flex-end",
  },
  rideTime: {
    fontSize: 16,
    fontWeight: "600",
  },
  rideDate: {
    fontSize: 12,
    marginTop: 2,
  },
  rideRoute: {
    marginBottom: 15,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  routeText: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: "#E0E0E0",
    marginLeft: 5,
    marginBottom: 8,
  },
  rideDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rideInfo: {
    alignItems: "center",
    flex: 1,
  },
  rideLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  rideValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  driverSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  driverRating: {
    fontSize: 12,
  },
  phoneButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trackButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  trackButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  rateButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    marginLeft: 8,
  },
  rateButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  bookAgainButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookAgainButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
});
