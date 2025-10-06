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
  const [isSelecting, setIsSelecting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeoutRef = useRef(null);
  const textInputRef = useRef(null);

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
    console.log("Selecting location:", suggestion.description);
    console.log("Full suggestion object:", suggestion);

    setIsSelecting(true);

    const selectedText = suggestion.description || suggestion.mainText || "";
    console.log("Setting text to:", selectedText);

    // Force update the text immediately
    onChangeText(selectedText);

    // Also try to update the text after a short delay (this might help with React Native's text input issues)
    setTimeout(() => {
      console.log("Force updating text after timeout");
      onChangeText(selectedText);
      // Also try to set the text directly using the ref
      if (textInputRef.current) {
        textInputRef.current.setNativeProps({ text: selectedText });
      }
    }, 100);

    // Close suggestions immediately
    setShowSuggestions(false);
    setSuggestions([]);

    try {
      const placeDetails = await GoogleMapsService.getPlaceDetails(
        suggestion.placeId
      );
      console.log("Place details:", placeDetails);
      if (placeDetails && onLocationSelect) {
        onLocationSelect(placeDetails);
      }
    } catch (error) {
      console.error("Error getting place details:", error);
    } finally {
      // Reset selecting state after a longer delay
      setTimeout(() => setIsSelecting(false), 200);
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

  const handleClearText = () => {
    onChangeText("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.suggestionItem,
        { borderBottomColor: theme.border || "#333" },
      ]}
      onPressIn={() => {
        handleLocationSelect(item);
      }}
      onPress={() => {
        handleLocationSelect(item);
      }}
      activeOpacity={0.7}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      delayPressIn={0}
      delayPressOut={0}
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
    <>
      <View style={styles.container}>
        {label ? (
          <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={[styles.input, { color: theme.text }]}
            placeholder={placeholder}
            placeholderTextColor="#999"
            value={value}
            onChangeText={handleTextChange}
            onFocus={() => {
              setIsFocused(true);
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              setIsFocused(false);
              // Only hide suggestions if not currently selecting
              if (!isSelecting) {
                setTimeout(() => setShowSuggestions(false), 500);
              }
            }}
          />

          {isLoading && (
            <ActivityIndicator
              size="small"
              color={theme.primary || "#007AFF"}
              style={styles.loadingIndicator}
            />
          )}

          {/* Clear button - show when focused and has text */}
          {isFocused && value.length > 0 && (
            <TouchableOpacity
              style={[
                styles.clearButton,
                {
                  backgroundColor: theme.background || "#f0f0f0",
                  right: showCurrentLocation && currentLocation ? 45 : 10,
                },
              ]}
              onPress={handleClearText}
            >
              <Ionicons name="close" size={16} color={theme.text || "#666"} />
            </TouchableOpacity>
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
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="always"
            removeClippedSubviews={false}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            bounces={true}
            overScrollMode="auto"
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 100,
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
  clearButton: {
    position: "absolute",
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    maxHeight: 200,
    borderRadius: 8,
    elevation: 30,
    zIndex: 999999,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  suggestionsList: {
    maxHeight: 200,
    flexGrow: 0,
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
