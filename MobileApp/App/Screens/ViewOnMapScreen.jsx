import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getDatabase, ref, get } from "firebase/database";

const ViewOnMapScreen = ({ route, navigation }) => {
  const { providerId } = route.params;
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const db = getDatabase();
        const providerRef = ref(db, `users/Service Provider/${providerId}`);
        const snapshot = await get(providerRef);

        if (snapshot.exists()) {
          const providerData = snapshot.val();
          console.log("Fetched provider:", providerData);
          setProvider(providerData);
        } else {
          console.log(`Provider with ID ${providerId} not found`);
        }
      } catch (error) {
        console.error("Error fetching provider details:", error);
      }
    };

    fetchProviderDetails();
  }, [providerId]);

  return (
    <View style={styles.container}>
      {provider && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: provider.location.latitude,
            longitude: provider.location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{
              latitude: provider.location.latitude,
              longitude: provider.location.longitude,
            }}
            title={`Provider Location: ${provider.username}`}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default ViewOnMapScreen;
