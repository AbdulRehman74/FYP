// ViewAllProvidersOnMap.jsx

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions , ActivityIndicator} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getDatabase, ref, get } from "firebase/database";

const ViewAllProvidersOnMap = ({ route }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const db = getDatabase();
        const taskRef = ref(db, `PostedTasks/${taskId}`);

        const snapshot = await get(taskRef);
        if (snapshot.exists()) {
          const taskData = snapshot.val();
          console.log("Fetched task:", taskData);
          setTask(taskData);
          await fetchServiceProviders(taskData.title); // Pass task title to filter providers
        } else {
          console.log(`Task with ID ${taskId} not found`);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchServiceProviders = async (taskTitle) => {
      try {
        const db = getDatabase();
        const serviceProvidersRef = ref(db, "users/Service Provider");

        const snapshot = await get(serviceProvidersRef);
        if (snapshot.exists()) {
          const allServiceProviders = snapshot.val();
          console.log("Fetched service providers:", allServiceProviders);

          const filteredProviders = Object.keys(allServiceProviders)
            .map((key) => ({
              id: key,
              ...allServiceProviders[key],
            }))
            .filter((provider) => provider.category === taskTitle);

          console.log("Filtered providers:", filteredProviders);
          setServiceProviders(filteredProviders);
        } else {
          console.log("No service providers found");
        }
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: 31.5497,
            longitude: 74.3436,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
      >
        {serviceProviders.map((provider) => (
          <Marker
            key={provider.id}
            coordinate={{
              latitude: provider.location.latitude,
              longitude: provider.location.longitude,
            }}
            title={provider.username}
            description={`Category: ${provider.category}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewAllProvidersOnMap;
