import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, TextInput, Linking } from "react-native";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import { FontAwesome } from '@expo/vector-icons';
import { auth } from "../../firebase";

const ViewTask = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postedBy, setPostedBy] = useState("");
  const [assignedServiceProvider, setAssignedServiceProvider] = useState(null);
  const [assignedServiceProviderId, setAssignedServiceProviderId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");
  const [editedTaskStartDate, setEditedTaskStartDate] = useState("");
  const [editedTaskEndDate, setEditedTaskEndDate] = useState("");
  const [editedTaskBudgetFrom, setEditedTaskBudgetFrom] = useState("");
  const [editedTaskBudgetTo, setEditedTaskBudgetTo] = useState("");

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
          await fetchPostedBy(taskData.postedBy); // Fetch the username

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

    const fetchPostedBy = async () => {
      try {
        const userId = auth.currentUser.uid;
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

    const fetchAssignedServiceProvider = async (providerId) => {
      try {
        const db = getDatabase();
        const providerRef = ref(db, `users/Service Provider/${providerId}`);

        const snapshot = await get(providerRef);
        if (snapshot.exists()) {
          const providerData = snapshot.val();
          console.log("Fetched assigned service provider:", providerData);
          setAssignedServiceProvider(providerData);
          setAssignedServiceProviderId(providerId);
        } else {
          console.log(`Service Provider with ID ${providerId} not found`);
        }
      } catch (error) {
        console.error("Error fetching assigned service provider:", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleCall = () => {
    // Implement chat functionality
    Linking.openURL(`tel:${assignedServiceProvider.mobileNumber}`);
  };

  const handleViewLocation = (providerId) => {
    navigation.navigate('ViewOnMapScreen', { providerId });
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

      await update(taskRef, {
        customerconfirmed: true,
      });

      // Update the local state to reflect the change
      setTask((prevTask) => ({
        ...prevTask,
        customerconfirmed: true,
      }));

      Alert.alert(
        "Task Completed",
        "The task status has been updated to Completed.",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to ReviewAnalyzer screen with route params
              navigation.navigate('ReviewAnalyzer', {
                taskId: taskId,
              });
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
      Alert.alert(
        "Error",
        "Failed to mark task as completed. Please try again later."
      );
    }
  };

  const handleEditTask = () => {
    if (task.taskStatus !== "Assigned" && task.taskStatus !== "Completed") {
      setEditMode(true);
      // Populate edited task data from current task state
      setEditedTaskTitle(task.title);
      setEditedTaskDescription(task.description);
      setEditedTaskStartDate(task.startDate);
      setEditedTaskEndDate(task.endDate);
      setEditedTaskBudgetFrom(String(task.budgetFrom));
      setEditedTaskBudgetTo(String(task.budgetTo));
    } else {
      Alert.alert(
        "Cannot Edit Task",
        "You cannot edit a task that is assigned or completed."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Clear edited task data
    setEditedTaskTitle("");
    setEditedTaskDescription("");
    setEditedTaskStartDate("");
    setEditedTaskEndDate("");
    setEditedTaskBudgetFrom("");
    setEditedTaskBudgetTo("");
  };

  const handleSaveEdit = async () => {
    try {
      const db = getDatabase();
      const taskRef = ref(db, `PostedTasks/${taskId}`);

      // Update task details in Firebase
      await update(taskRef, {
        title: editedTaskTitle,
        description: editedTaskDescription,
        startDate: editedTaskStartDate,
        endDate: editedTaskEndDate,
        budgetFrom: Number(editedTaskBudgetFrom),
        budgetTo: Number(editedTaskBudgetTo),
      });

      // Update local task state
      setTask((prevTask) => ({
        ...prevTask,
        title: editedTaskTitle,
        description: editedTaskDescription,
        startDate: editedTaskStartDate,
        endDate: editedTaskEndDate,
        budgetFrom: Number(editedTaskBudgetFrom),
        budgetTo: Number(editedTaskBudgetTo),
      }));

      // Exit edit mode
      setEditMode(false);

      Alert.alert(
        "Task Updated",
        "The task details have been updated successfully.",
        [
          {
            text: "OK",
          },
        ]
      );
    } catch (error) {
      console.error("Error updating task details:", error);
      Alert.alert(
        "Error",
        "Failed to update task details. Please try again later."
      );
    }
  };

  const handleDeleteTask = () => {
    if (task.taskStatus === "Posted" || task.taskStatus === "Assigned") {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this task?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: deleteTask,
          },
        ]
      );
    } else {
      Alert.alert(
        "Cannot Delete Task",
        "You cannot delete a task that is not posted or assigned."
      );
    }
  };

  const deleteTask = async () => {
    try {
      const db = getDatabase();
      const taskRef = ref(db, `PostedTasks/${taskId}`);

      // Delete the task from Firebase
      await remove(taskRef);

      // Navigate back to previous screen or home screen
      navigation.goBack(); // Example: go back to the previous screen after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      Alert.alert(
        "Error",
        "Failed to delete task. Please try again later."
      );
    }
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
      <View style={styles.content}>
        {/* Task Details Section */}
        {!editMode && (
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
        )}

        {/* Edit Task Form Section */}
        {editMode && (
          <View style={styles.taskDetails}>
            <TextInput
              style={styles.input}
              value={editedTaskTitle}
              onChangeText={setEditedTaskTitle}
              placeholder="Task Title"
            />
            <TextInput
              style={styles.input}
              value={editedTaskDescription}
              onChangeText={setEditedTaskDescription}
              placeholder="Description"
              multiline
              numberOfLines={4}
            />
            <TextInput
              style={styles.input}
              value={editedTaskStartDate}
              onChangeText={setEditedTaskStartDate}
              placeholder="Start Date"
            />
            <TextInput
              style={styles.input}
              value={editedTaskEndDate}
              onChangeText={setEditedTaskEndDate}
              placeholder="End Date"
            />
            <TextInput
              style={styles.input}
              value={editedTaskBudgetFrom}
              onChangeText={setEditedTaskBudgetFrom}
              placeholder="Budget From"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={editedTaskBudgetTo}
              onChangeText={setEditedTaskBudgetTo}
              placeholder="Budget To"
              keyboardType="numeric"
            />
          </View>
        )}

        {/* Action Buttons Section */}
        {!editMode && (
          <View>
            {/* Assigned Service Provider Section */}
            {assignedServiceProvider && (
              <View style={styles.providerCard}>
                <View style={styles.providerHeader}>
                  <Text style={styles.providerName}>{assignedServiceProvider.username}</Text>
                </View>
                <View style={styles.providerDetailRow}>
                  <Text style={styles.detailLabel}>Category:</Text>
                  <Text style={styles.detailValue}>{assignedServiceProvider.category}</Text>
                </View>
                <View style={styles.providerDetailRow}>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>{assignedServiceProvider.location.address}</Text>
                </View>
                {renderStars(assignedServiceProvider.rating)}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handleCall}>
                    <Text style={styles.buttonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => handleViewLocation(assignedServiceProviderId)}>
                    <Text style={styles.buttonText}>View Location</Text>
                  </TouchableOpacity>

                </View>
              </View>
            )}

            {/* Mark as Completed Button */}
            {task.taskStatus === "Assigned" && !task.customerconfirmed && (
              <TouchableOpacity
                style={styles.markCompletedButton}
                onPress={handleMarkCompleted}
              >
                <Text style={styles.markCompletedButtonText}>Mark as Completed</Text>
              </TouchableOpacity>
            )}

            {/* View Recommendations Button */}
            {task.taskStatus === "Posted" && (
              <TouchableOpacity
                style={styles.viewRecommendationsButton}
                onPress={() => {
                  // Navigate to task details screen
                  navigation.navigate('TaskDetail', {
                    taskId: taskId,
                  });
                }}
              >
                <Text style={styles.viewRecommendationsButtonText}>View Recommendations</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Edit and Delete Buttons */}
        {!editMode && (task.taskStatus === "Posted") && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditTask}
            >
              <Text style={styles.editButtonText}>Edit Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteTask}
            >
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Save and Cancel Edit Buttons */}
        {editMode && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleCancelEdit}
            >
              <Text style={styles.deleteButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
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
  providerCard: {
    marginTop: 20,
    padding: 15,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4682b4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold", // Ensure text is bold
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
  viewRecommendationsButton: {
    backgroundColor: "#4682b4",
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  viewRecommendationsButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#4682b4",
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ViewTask;
