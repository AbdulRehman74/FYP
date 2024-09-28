import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getDatabase, ref, get } from "firebase/database";

const ViewCustomerLocationScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [customerLocation, setCustomerLocation] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const db = getDatabase();
        const taskRef = ref(db, `PostedTasks/${taskId}`);
        const snapshot = await get(taskRef);

        if (snapshot.exists()) {
          const taskData = snapshot.val();
          console.log("Fetched task:", taskData);

          const customerId = taskData.customerId;
          await fetchCustomerLocation(customerId);
        } else {
          console.log(`Task with ID ${taskId} not found`);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    const fetchCustomerLocation = async (customerId) => {
      try {
        const db = getDatabase();
        const customerRef = ref(db, `users/Customer/${customerId}`);
        const snapshot = await get(customerRef);

        if (snapshot.exists()) {
          const customerData = snapshot.val();
          console.log("Fetched customer:", customerData);

          if (customerData.location && customerData.location.latitude && customerData.location.longitude) {
            setCustomerLocation({
              latitude: customerData.location.latitude,
              longitude: customerData.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            });
          } else {
            console.log(`Customer location not found for ID ${customerId}`);
          }
        } else {
          console.log(`Customer with ID ${customerId} not found`);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  return (
    <View style={styles.container}>
      {customerLocation && (
        <MapView
          style={styles.map}
          initialRegion={customerLocation}
        >
          <Marker
            coordinate={{
              latitude: customerLocation.latitude,
              longitude: customerLocation.longitude,
            }}
            title="Customer Location"
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

export default ViewCustomerLocationScreen;
