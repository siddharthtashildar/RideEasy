import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default function ConfirmScreen({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const { ride, from, to, fromLocationDetails, toLocationDetails } =
    route.params || {};

  const rideDetails = {
    standard: { name: "Standard", price: 120, time: "7 Mins", seats: 4 },
    premium: { name: "Premium", price: 220, time: "5 Mins", seats: 4 },
    suv: { name: "SUV", price: 320, time: "10 Mins", seats: 6 },
  };

  const selectedRide = rideDetails[ride] || rideDetails.standard;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Ride Confirmation
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Confirmation Card */}
      <View style={[styles.confirmationCard, { backgroundColor: theme.card }]}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
        </View>
        <Text style={[styles.confirmationTitle, { color: theme.text }]}>
          Ride Confirmed!
        </Text>
        <Text
          style={[styles.confirmationSubtitle, { color: theme.textSecondary }]}
        >
          Your ride has been successfully booked
        </Text>
      </View>

      {/* Ride Details */}
      <View style={[styles.detailsCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          My Ride
        </Text>

        {/* Vehicle Details */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="car" size={20} color={theme.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Vehicle Type
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {selectedRide.name}
            </Text>
          </View>
        </View>

        {/* Pickup Location */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="location" size={20} color="#4CAF50" />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Pickup Point
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {from}
            </Text>
          </View>
        </View>

        {/* Drop Location */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="flag" size={20} color="#F44336" />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Drop Point
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {to}
            </Text>
          </View>
        </View>

        {/* Estimated Time */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="time" size={20} color={theme.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Estimated Time
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {selectedRide.time}
            </Text>
          </View>
        </View>

        {/* Seats */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="people" size={20} color={theme.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Seats Available
            </Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {selectedRide.seats} seats
            </Text>
          </View>
        </View>

        {/* Price */}
        <View style={[styles.detailRow, styles.priceRow]}>
          <View style={styles.detailIcon}>
            <Ionicons name="cash" size={20} color={theme.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Total Fare
            </Text>
            <Text style={[styles.priceValue, { color: theme.primary }]}>
              ₹{selectedRide.price}
            </Text>
          </View>
        </View>
      </View>

      {/* Driver Info */}
      <View style={[styles.driverCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Driver Details
        </Text>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Ionicons name="person" size={30} color={theme.primary} />
          </View>
          <View style={styles.driverDetails}>
            <Text style={[styles.driverName, { color: theme.text }]}>
              Driver Name
            </Text>
            <Text style={[styles.driverRating, { color: theme.textSecondary }]}>
              ⭐ 4.8 • 2,500+ rides
            </Text>
            <Text style={[styles.driverPhone, { color: theme.primary }]}>
              +91 98765 43210
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: theme.primary }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
            Book Another Ride
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("MyRides")}
        >
          <Text style={styles.primaryButtonText}>My Rides</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 10,
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
  confirmationCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  successIcon: {
    marginBottom: 15,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  confirmationSubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  detailsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  priceRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 16,
    marginTop: 8,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  driverCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  driverRating: {
    fontSize: 14,
    marginBottom: 4,
  },
  driverPhone: {
    fontSize: 16,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    marginRight: 10,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
