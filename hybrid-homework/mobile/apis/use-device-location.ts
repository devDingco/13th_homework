import * as Location from "expo-location";

export const useDeviceLocation = () => {
  const fetchDeviceLocationForLatLngSet = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    // 권한 허락했을 때
    if (result.status === "granted") {
      const location = await Location.getCurrentPositionAsync();
      return {
        fetchDeviceLocationForLatLngSet: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      };
    } else {
      // 권한 허락하지 않았을 때 기본 위치
      return {
        fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 },
      };
    }
  };
  return {
    fetchDeviceLocationForLatLngSet,
  };
};
