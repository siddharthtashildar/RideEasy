import ENVIRONMENT from "../config/environment";

const GOOGLE_PLACES_API_KEY = ENVIRONMENT.GOOGLE_PLACES_API_KEY;

class GoogleMapsService {
  static async searchPlaces(query, location = null, radius = 20000) {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const baseUrl =
        "https://maps.googleapis.com/maps/api/place/autocomplete/json";
      const params = new URLSearchParams({
        input: query,
        key: GOOGLE_PLACES_API_KEY,
        types: "establishment|geocode",
        language: "en",
      });

      if (location) {
        params.append("location", location);
        params.append("radius", radius.toString());
      }

      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();

      if (data.status === "OK") {
        return data.predictions.map((prediction) => ({
          placeId: prediction.place_id,
          description: prediction.description,
          mainText:
            prediction.structured_formatting?.main_text ||
            prediction.description,
          secondaryText: prediction.structured_formatting?.secondary_text || "",
          types: prediction.types,
        }));
      } else {
        console.warn(
          "Google Places API error:",
          data.status,
          data.error_message
        );
        return [];
      }
    } catch (error) {
      console.error("Error searching places:", error);
      return [];
    }
  }

  static async getPlaceDetails(placeId) {
    if (!placeId) {
      return null;
    }

    try {
      const baseUrl = "https://maps.googleapis.com/maps/api/place/details/json";
      const params = new URLSearchParams({
        place_id: placeId,
        key: GOOGLE_PLACES_API_KEY,
        fields: "name,formatted_address,geometry,place_id,types",
      });

      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();

      if (data.status === "OK") {
        const place = data.result;
        return {
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          location: {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          },
          types: place.types,
        };
      } else {
        console.warn(
          "Google Places Details API error:",
          data.status,
          data.error_message
        );
        return null;
      }
    } catch (error) {
      console.error("Error getting place details:", error);
      return null;
    }
  }

  static async getCurrentLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  }
}

export default GoogleMapsService;
