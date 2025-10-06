import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoogleMapsService from "../services/GoogleMapsService";

export default function LocationSearchInput({
  placeholder = "Enter location",
  value = "",
  onChangeText,
  onLocationSelect,
  theme,
  label = "",
  showCurrentLocation = true,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (showCurrentLocation) {
      GoogleMapsService.getCurrentLocation().then(setCurrentLocation);
    }
  }, [showCurrentLocation]);
  const handleTextChange = (text) => {
    onChangeText(text);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (text.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const locationBias = currentLocation
          ? `${currentLocation.latitude},${currentLocation.longitude}`
          : null;

        const results = await GoogleMapsService.searchPlaces(
          text,
          locationBias
        );
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error searching places:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleLocationSelect = async (suggestion) => {
    setShowSuggestions(false);
    onChangeText(suggestion.description);

    const placeDetails = await GoogleMapsService.getPlaceDetails(
      suggestion.placeId
    );
    if (placeDetails && onLocationSelect) {
      onLocationSelect(placeDetails);
    }
  };

  const handleCurrentLocationSelect = async () => {
    if (!currentLocation) return;

    const currentLocationText = "Current Location";
    onChangeText(currentLocationText);

    if (onLocationSelect) {
      onLocationSelect({
        placeId: "current_location",
        name: "Current Location",
        address: "Current Location",
        location: currentLocation,
        types: ["current_location"],
      });
    }
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.suggestionItem,
        { borderBottomColor: theme.border || "#333" },
      ]}
      onPress={() => handleLocationSelect(item)}
    >
      <Ionicons
        name="location-outline"
        size={20}
        color={theme.text || "#fff"}
        style={styles.suggestionIcon}
      />
      <View style={styles.suggestionTextContainer}>
        <Text
          style={[styles.suggestionMainText, { color: theme.text || "#fff" }]}
        >
          {item.mainText}
        </Text>
        {item.secondaryText && (
          <Text
            style={[
              styles.suggestionSecondaryText,
              { color: theme.textSecondary || "#999" },
            ]}
          >
            {item.secondaryText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={handleTextChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />

        {isLoading && (
          <ActivityIndicator
            size="small"
            color={theme.primary || "#007AFF"}
            style={styles.loadingIndicator}
          />
        )}

        {showCurrentLocation && currentLocation && (
          <TouchableOpacity
            style={[
              styles.currentLocationButton,
              { backgroundColor: theme.primary },
            ]}
            onPress={handleCurrentLocationSelect}
          >
            <Ionicons name="locate" size={16} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View
          style={[styles.suggestionsContainer, { backgroundColor: theme.card }]}
        >
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.placeId}
            style={styles.suggestionsList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 2,
    paddingRight: 40,
  },
  loadingIndicator: {
    position: "absolute",
    right: 10,
  },
  currentLocationButton: {
    position: "absolute",
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    maxHeight: 200,
    borderRadius: 8,
    elevation: 5,
    zIndex: 1000,
    marginTop: 4,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionMainText: {
    fontSize: 14,
    fontWeight: "500",
  },
  suggestionSecondaryText: {
    fontSize: 12,
    marginTop: 2,
  },
});
