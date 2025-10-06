class OpenStreetMapService {
  static async searchPlaces(query, location = null, radius = 20000) {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const baseUrl = "https://nominatim.openstreetmap.org/search";
      const params = new URLSearchParams({
        q: query,
        format: "json",
        limit: 10,
        addressdetails: 1,
        "accept-language": "en",
      });

      if (location) {
        const [lat, lng] = location.split(",");
        params.append("lat", lat);
        params.append("lon", lng);
        params.append("radius", (radius / 1000).toString());
      }

      const response = await fetch(`${baseUrl}?${params}`, {
        headers: {
          "User-Agent": "RideEasy/1.0",
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        return data.map((place) => ({
          placeId: place.place_id,
          description: place.display_name,
          mainText: place.name || place.display_name.split(",")[0],
          secondaryText: place.display_name
            .split(",")
            .slice(1)
            .join(",")
            .trim(),
          types: [place.type],
          location: {
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon),
          },
        }));
      } else {
        console.warn("OpenStreetMap API error:", data);
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
      const baseUrl = `https://nominatim.openstreetmap.org/details`;
      const params = new URLSearchParams({
        place_id: placeId,
        format: "json",
        addressdetails: 1,
      });

      const response = await fetch(`${baseUrl}?${params}`, {
        headers: {
          "User-Agent": "RideEasy/1.0",
        },
      });
      const data = await response.json();

      if (data && data.lat && data.lon) {
        return {
          placeId: data.place_id,
          name: data.name || data.display_name,
          address: data.display_name,
          location: {
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon),
          },
          types: [data.type],
        };
      } else {
        console.warn("OpenStreetMap Details API error:", data);
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

export default OpenStreetMapService;
