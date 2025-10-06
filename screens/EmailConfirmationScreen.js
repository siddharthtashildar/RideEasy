import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function EmailConfirmationScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { user, signOut } = useAuth();
  const [resending, setResending] = useState(false);

  const handleResendConfirmation = async () => {
    if (!user?.email) return;

    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
        options: {
          emailRedirectTo: "exp://10.216.126.173:8081", // Your IP address
        },
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Confirmation email sent! Please check your inbox.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to resend confirmation email");
    } finally {
      setResending(false);
    }
  };

  const handleOpenEmail = () => {
    Linking.openURL("mailto:");
  };

  const handleBackToLogin = async () => {
    await signOut();
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { backgroundColor: theme.card }]}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
          <Ionicons name="mail-outline" size={48} color="#000" />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>
          Check Your Email
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: theme.text }]}>
          We've sent a confirmation link to:
        </Text>
        <Text style={[styles.email, { color: theme.primary }]}>
          {user?.email}
        </Text>

        <Text style={[styles.instruction, { color: theme.text }]}>
          Click the link in the email to verify your account and start using RideEasy.
        </Text>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleOpenEmail}
        >
          <Ionicons name="mail" size={20} color="#000" />
          <Text style={styles.buttonText}>Open Email App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: theme.primary }]}
          onPress={handleResendConfirmation}
          disabled={resending}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
            {resending ? "Sending..." : "Resend Confirmation Email"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToLogin}
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    padding: 32,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginBottom: 16,
  },
  instruction: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginLeft: 8,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textDecorationLine: "underline",
  },
});
