import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function MapScreen() {
  const { theme } = useContext(ThemeContext);
  const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <MapView
        style={styles.map}
        initialRegion={userLocation}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            description="You are here"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" ,...StyleSheet.absoluteFillObject, flex: 1},
  text: { fontSize: 18, fontWeight: "bold" },
    map: {
    ...StyleSheet.absoluteFillObject,
  },
});