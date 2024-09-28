import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, Alert, Linking } from "react-native";
import { getDatabase, ref, get, update } from "firebase/database";
import { getDistance } from "geolib";
import { FontAwesome } from '@expo/vector-icons';
import { auth } from "../../firebase";

const TaskDetail = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postedBy, setPostedBy] = useState("");

  useEffect(() => {
    if (!taskId) {
      console.error("No taskId found in route params");
      setLoading(false);
      return;
    }

    const fetchTaskDetails = async () => {
      try {
        const db = getDatabase();
        const taskRef = ref(db, `PostedTasks/${taskId}`);

        const snapshot = await get(taskRef);
        if (snapshot.exists()) {
          const taskData = snapshot.val();
          console.log("Fetched task:", taskData);
          setTask(taskData);
          await fetchServiceProviders(taskData);
          await fetchPostedBy(taskData.postedBy); // Fetch the username
        } else {
          console.log(`Task with ID ${taskId} not found`);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchServiceProviders = async (taskData) => {
      try {
        const db = getDatabase();
        const serviceProvidersRef = ref(db, "users/Service Provider");

        const snapshot = await get(serviceProvidersRef);
        if (snapshot.exists()) {
          const allServiceProviders = snapshot.val();
          console.log("Fetched service providers:", allServiceProviders);

          const taskLocation = {
            latitude: taskData.location.latitude,
            longitude: taskData.location.longitude,
          };

          // Filter and sort providers
          const providersWithDistance = Object.keys(allServiceProviders)
            .map((key) => ({
              id: key,
              ...allServiceProviders[key],
            }))
            .filter((provider) => provider.category === taskData.title) // Filter by category matching task title
            .map((provider) => {
              const providerLocation = {
                latitude: provider.location.latitude,
                longitude: provider.location.longitude,
              };

              let distance;
              try {
                distance = (getDistance(taskLocation, providerLocation) / 1000).toFixed(2); // Convert to kilometers
              } catch (error) {
                distance = "Unknown";
              }

              return {
                ...provider,
                distance,
              };
            })
            .sort((a, b) => b.rating - a.rating); // Sort by rating

          console.log("Providers with distances and matching category:", providersWithDistance);

          setServiceProviders(providersWithDistance);
        } else {
          console.log("No service providers found");
        }
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    const fetchPostedBy = async (userId) => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/Customer/${userId}`);

        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Fetched user data:", userData);
          setPostedBy(userData.username); // Set the username
        } else {
          console.log(`User with ID ${userId} not found`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  useEffect(() => {
    // Check if both customer and provider have confirmed
    if (task && task.customerConfirmed && task.providerConfirmed) {
      handleTaskCompletion();
    }
  }, [task]);

  const handleTaskCompletion = async () => {
    try {
      const db = getDatabase();
      const taskRef = ref(db, `PostedTasks/${taskId}`);
      await update(taskRef, {
        taskStatus: "Completed",
      });

      Alert.alert("Task Completed", "The task status has been updated to Completed.");

      // Potentially navigate to a review screen or handle review process here
      // Example navigation:
      // navigation.navigate('ReviewScreen', { taskId });

    } catch (error) {
      console.error("Error completing task:", error);
      Alert.alert("Error", "Failed to complete the task. Please try again later.");
    }
  };

  const handleAccept = (providerId) => {
    Alert.alert(
      "Confirm Acceptance",
      "Are you sure you want to accept this service provider?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => acceptServiceProvider(providerId),
        },
      ]
    );
  };

  const acceptServiceProvider = async (providerId) => {
    try {
      const db = getDatabase();
      const taskRef = ref(db, `PostedTasks/${taskId}`);
      await update(taskRef, {
        taskStatus: "Assigned",
        assignedServiceProvider: providerId,
        providerConfirmed: true, // Update provider confirmation
      });

      Alert.alert("Provider Accepted", "Task status updated to assigned.");

      // Navigate back to the home screen
      navigation.navigate('CustomerTabs');
    } catch (error) {
      console.error("Error accepting provider:", error);
      Alert.alert("Error", "Failed to accept provider. Please try again later.");
    }
  };

  const handleViewOnMap = (providerId) => {
    // Navigate to ViewOnMapScreen and pass providerId
    navigation.navigate('ViewOnMapScreen', { providerId });
  };

  const handleViewAllProvidersOnMap = () => {
    navigation.navigate('ViewAllProvidersOnMap', { taskId });
  };

  const handleChat = (providerId) => {
    // Navigate to Chat screen and pass customerId and providerId
    navigation.navigate('Chat', { providerId });
  };

  const handleCallProvider = (mobileNumber) => {
    // Use Linking API to initiate a call
    Linking.openURL(`tel:${mobileNumber}`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Task not found.</Text>
      </View>
    );
  }

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={20}
          color="gold"
        />
      );
    }
    return <View style={styles.stars}>{stars}</View>;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.taskDetails}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.taskDetailRow}>
          <Text style={styles.detailLabel}>Posted By:</Text>
          <Text style={styles.detailValue}>{postedBy}</Text>
        </View>
        <View style={styles.taskDetailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{task.location.address}</Text>
        </View>
        <View style={styles.taskDetailRow}>
          <Text style={styles.detailLabel}>Start Date:</Text>
          <Text style={styles.detailValue}>{task.startDate}</Text>
        </View>
        <View style={styles.taskDetailRow}>
          <Text style={styles.detailLabel}>End Date:</Text>
          <Text style={styles.detailValue}>{task.endDate}</Text>
        </View>
        <View style={styles.taskDetailRow}>
          <Text style={styles.detailLabel}>Budget:</Text>
          <Text style={styles.detailValue}>${task.budgetFrom} - ${task.budgetTo}</Text>
        </View>
        <View style={styles.taskDetailRow}>
          <Text style={styles.detailLabel}>Description:</Text>
          <Text style={styles.detailValue}>{task.description}</Text>
        </View>
      </View>
      <View style={styles.serviceProviders}>
        <Text style={styles.title}>Recommended Service Providers</Text>
        <View style={styles.viewAllButton}>
          <Button
            title="View All Providers on Map"
            onPress={handleViewAllProvidersOnMap}
          />
        </View>
        {serviceProviders.length > 0 ? (
          serviceProviders.map((provider, index) => (
            <View key={index} style={styles.providerCard}>
              <View style={styles.providerHeader}>
                <Text style={styles.providerName}>{provider.username}</Text>
              </View>
              <View style={styles.providerDetailRow}>
                <Text style={styles.detailLabel}>Distance:</Text>
                <Text style={styles.detailValue}>{provider.distance} km</Text>
              </View>
              <View style={styles.providerDetailRow}>
                <Text style={styles.detailLabel}>Category:</Text>
                <Text style={styles.detailValue}>{provider.category}</Text>
              </View>
              <View style={styles.providerDetailRow}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>{provider.location.address}</Text>
              </View>
              <View style={styles.providerDetailRow}>
                <Text style={styles.detailLabel}>Mobile Number:</Text>
                <Text style={styles.detailValue}>{provider.mobileNumber}</Text>
              </View>
              {renderStars(provider.rating)}
              <View style={styles.buttons}>
                <Button title="Accept" onPress={() => handleAccept(provider.id)} />
                <Button title="Call" onPress={() => handleCallProvider(provider.mobileNumber)} />
                <Button title="View on Map" onPress={() => handleViewOnMap(provider.id)} />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>No service providers found nearby.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(222, 213, 205)",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  taskDetails: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
  taskDetailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailValue: {
    fontWeight: 'normal',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceProviders: {
    marginTop: 20,
  },
  providerCard: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  providerHeader: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  providerName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
  providerDetailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  viewAllButton: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default TaskDetail;
