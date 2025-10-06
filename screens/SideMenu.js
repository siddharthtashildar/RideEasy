import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function SideMenu({ navigation }) {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { signOut, user } = useAuth();

  const isDark = theme.background === "#121212";

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          const { error } = await signOut();
          if (error) {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View
          style={[styles.profileAvatar, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.profileInitials, { color: "#000" }]}>
            {user?.user_metadata?.full_name
              ? user.user_metadata.full_name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.profileName, { color: theme.text }]}>
            {user?.user_metadata?.full_name || "User"}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: theme.text,
          opacity: 0.2,
          marginVertical: 15,
        }}
      />

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleTheme}>
        <Ionicons
          name={isDark ? "moon-outline" : "sunny-outline"}
          size={20}
          color={theme.icoColor}
        />
        <Text
          style={[
            {
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 8,
              color: theme.text,
              marginLeft: 15,
            },
          ]}
        >
          {/* {isDark ? "Dark Mode" : "Light Mode"} */}
          Theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("MyRides")}
      >
        <Ionicons name={"car-outline"} size={20} color={theme.icoColor} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.text,
            marginLeft: 15,
          }}
        >
          My Rides
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons
          name={"share-social-outline"}
          size={20}
          color={theme.icoColor}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.text,
            marginLeft: 15,
          }}
        >
          Share
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons
          name={"help-circle-outline"}
          size={22}
          color={theme.icoColor}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.text,
            marginLeft: 15,
          }}
        >
          Support
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name={"settings-outline"} size={20} color={theme.icoColor} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.text,
            marginLeft: 15,
          }}
        >
          Settings
        </Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
        <Ionicons name={"log-out-outline"} size={20} color={theme.icoColor} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.text,
            marginLeft: 15,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileInitials: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuButton: {
    flexDirection: "row", // icon comes after text
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
