import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Linking } from "react-native";
import { getDatabase, ref, get, update } from "firebase/database";
import { FontAwesome } from '@expo/vector-icons';
import { auth } from "../../firebase";

const ViewTaskProvider = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postedBy, setPostedBy] = useState("");
  const [assignedServiceProvider, setAssignedServiceProvider] = useState(null);

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
          const customerId = taskData.customerId;
          await fetchPostedBy(customerId);  // Fetch the username
          
          // Fetch assigned service provider if status is assigned or completed
          if (taskData.taskStatus === "Assigned" || taskData.taskStatus === "Completed") {
            await fetchAssignedServiceProvider(taskData.assignedServiceProvider);
          }
        } else {
          console.log(`Task with ID ${taskId} not found`);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
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
          setContact(userData.mobileNumber);
        } else {
          console.log(`User with ID ${userId} not found`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchAssignedServiceProvider = async (providerId) => {
      try {
        const db = getDatabase();
        const providerRef = ref(db, `users/Service Provider/${providerId}`);

        const snapshot = await get(providerRef);
        if (snapshot.exists()) {
          const providerData = snapshot.val();
          console.log("Fetched assigned service provider:", providerData);
          setAssignedServiceProvider(providerData);
        } else {
          console.log(`Service Provider with ID ${providerId} not found`);
        }
      } catch (error) {
        console.error("Error fetching assigned service provider:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleCallCustomer = () => {
    Linking.openURL(`tel:${contact}`);
  };

  const handleViewCustomerLocation = () => {
    navigation.navigate('ViewCustomerLocationScreen', { taskId });
  };

  const handleMarkCompleted = () => {
    Alert.alert(
      "Confirm Completion",
      "Are you sure you want to mark this task as completed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: markTaskAsCompleted,
        },
      ]
    );
  };

  const markTaskAsCompleted = async () => {
    try {
      const db = getDatabase();
      const taskRef = ref(db, `PostedTasks/${taskId}`);
  
      const snapshot = await get(taskRef);
      if (snapshot.exists()) {
        const taskData = snapshot.val();
        if (taskData.customerconfirmed) {
          // Update provider confirmed and task status to completed
          await update(taskRef, {
            providerconfirmed: true,
            taskStatus: "Completed",
          });
  
          // Update the local state to reflect the change
          setTask((prevTask) => ({
            ...prevTask,
            providerconfirmed: true,
            taskStatus: "Completed",
          }));

          // Fetch the current provider details
          const providerId = taskData.assignedServiceProvider;
          const providerRef = ref(db, `users/Service Provider/${providerId}`);
          const providerSnapshot = await get(providerRef);

          if (providerSnapshot.exists()) {
            const providerData = providerSnapshot.val();
            // Increment the completedTasks count
            const updatedCompletedTasks = providerData.completedTasks ? providerData.completedTasks + 1 : 1;

            // Update the completedTasks count in Firebase
            await update(providerRef, {
              completedTasks: updatedCompletedTasks,
            });

            console.log(`Updated completed tasks count for provider ${providerId} to ${updatedCompletedTasks}`);
          } else {
            console.log(`Service Provider with ID ${providerId} not found`);
          }
  
          Alert.alert("Task Completed", "The task status has been updated to Completed.");
          navigation.navigate("FavProvider");
        } else {
          Alert.alert("Customer Confirmation Pending", "The customer has not yet confirmed the task completion.");
        }
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
      Alert.alert("Error", "Failed to mark task as completed. Please try again later.");
    }
  };

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Task Details Section */}
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

        {/* Action Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCallCustomer}
          >
            <Text style={styles.buttonText}>Call Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleViewCustomerLocation}
          >
            <Text style={styles.buttonText}>View Location</Text>
          </TouchableOpacity>
        </View>

        {task.taskStatus === "Assigned" || task.taskStatus === "Completed" ? (
          <TouchableOpacity
            style={styles.markCompletedButton}
            onPress={handleMarkCompleted}
          >
            <Text style={styles.markCompletedButtonText}>Mark as Completed</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    padding: 20,
  },
  taskDetails: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    alignItems: 'center', // Center-align content
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
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4682b4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  markCompletedButton: {
    backgroundColor: "#32cd32",
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  markCompletedButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ViewTaskProvider;
