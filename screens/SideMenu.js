import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function SideMenu() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  const isDark = theme.background === "#121212";
  console.log(isDark);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../assets/pfp1.jpg")}
          style={styles.profileImage}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.profileName, { color: theme.text }]}>
            Niggachu
          </Text>
          <Text style={[styles.profileEmail, { color: theme.text }]}>
            Niggachu@email.com
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
        <Text style={[{ fontSize: 18, fontWeight: "bold", marginRight:8, color: theme.text,marginLeft:15 }]}>
          {/* {isDark ? "Dark Mode" : "Light Mode"} */}
          Theme
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons
          name={"car-outline"}
          size={20}
          color={theme.icoColor}
        />
        <Text style={{ fontSize: 16, fontWeight: "bold",color: theme.text,marginLeft:15 }}>My Rides</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons
          name={"share-social-outline"}
          size={20}
          color={theme.icoColor}
        />
        <Text style={{ fontSize: 16, fontWeight: "bold",color: theme.text,marginLeft:15 }}>Share</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons
          name={"help-circle-outline"}
          size={22}
          color={theme.icoColor}
        />
        <Text style={{ fontSize: 16, fontWeight: "bold",color: theme.text, marginLeft:15 }}>Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Ionicons
          name={"settings-outline"}
          size={20}
          color={theme.icoColor}
        />
        <Text style={{ fontSize: 16, fontWeight: "bold",color: theme.text, marginLeft:15 }}>Settings</Text>
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
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
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
