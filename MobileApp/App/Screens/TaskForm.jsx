import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, push, get, ref } from "firebase/database";
import { auth } from "../../firebase";
import { storage } from "../../firebase";
import * as ImagePicker from 'expo-image-picker';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const TaskForm = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [mode, setMode] = useState("physical");
  const [TaskLocation, setTaskLocation] = useState(null); // Initial location fetched from Firebase
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [budgetFrom, setBudgetFrom] = useState("500");
  const [budgetTo, setBudgetTo] = useState("1000");
  const [selectedService, setSelectedService] = useState(""); // State to store selected service
  const [enteredAddress, setEnteredAddress] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [username, setUsername] = useState("");
  const [taskStatus, setTaskStatus] = useState("Posted");
  const [postedTask, setPostedTask] = useState(null);
  const maxImages = 3;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const db = getDatabase();
        const userRef = ref(db, `users/Customer/${userId}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (userData) {
          setUsername(userData.username); // Assuming the username is stored under the username key
          if (userData.location) {
            const { latitude, longitude, address, city, province } = userData.location;
            setTaskLocation({ latitude, longitude, address, city, province });
            setEnteredAddress(address || "");
          }
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.error('Error fetching user data from Firebase:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Retrieve the selected service from AsyncStorage
    AsyncStorage.getItem('selectedService')
      .then(service => {
        if (service) {
          setSelectedService(service);
          setTaskTitle(service);
        }
      })
      .catch(error => console.error('Error retrieving selected service from AsyncStorage:', error));
  }, []);

  const handleContinue = () => {
    // Check if enteredAddress is not empty
    if (!enteredAddress.trim()) {
      alert("Please enter an address.");
    } else {
      saveTaskDetails();
      setModalVisible(true); // Show the confirmation modal
    }
  };

  const handleSelectLocation = async (event) => {
    try {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setTaskLocation({ latitude, longitude }); // Update taskLocation with latitude and longitude

      // Reverse geocoding to fetch address, city, and province
      const locationDetails = await Location.reverseGeocodeAsync({ latitude, longitude });
      const { address, city, region } = locationDetails[0]; // Assuming the first result is accurate

      // Update taskLocation with all location details
      setTaskLocation({
        latitude,
        longitude,
        address: enteredAddress || "", // Set to empty string if not available
        city: city || "",
        province: region || "", // Assuming region corresponds to province
      });
      setEnteredAddress(address || "");
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isDueDatePickerVisible, setDueDatePickerVisibility] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showDueDatePicker = () => {
    setDueDatePickerVisibility(true);
  };
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setStartDatePickerVisibility(false); // Hide after selection
  };

  const onDueDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setDueDate(currentDate);
    setDueDatePickerVisibility(false); // Hide after selection
  };

  const pickAndUploadImage = async () => {
    if (imageUris.length >= 4) {
      alert("You can only upload up to 4 images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const uri = result.assets[0].uri;
      console.log("Image URI: ", uri);
      const newImageUris = [...imageUris, uri];
      setImageUris(newImageUris); // Update state with new URI list
      uploadImage(uri, newImageUris.length - 1); // Upload and pass index for reference
    }
  };

  const uploadImage = async (uri, index) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      // Include the 'TaskImages' folder in the storage reference path
      const fileRef = storageRef(storage, `TaskImages/images_${Date.now()}_${index}`);
      const uploadTask = uploadBytesResumable(fileRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload of image ${index + 1} is ${progress}% done`);
        },
        (error) => {
          console.error("Upload error: ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const updatedUris = [...imageUris];
            updatedUris[index] = downloadURL;
            setImageUris(updatedUris); // Update the state with the URL instead of the local URI
          });
        }
      );
    } catch (error) {
      console.error("Failed to upload image: ", error);
    }
  };

  const saveTaskDetails = () => {
    console.log("Saving task details...");
    const userId = auth.currentUser.uid;

    const db = getDatabase();
    const tasksRef = ref(db, `PostedTasks`);

    const { latitude, longitude } = TaskLocation;
    const taskData = {
      customerId: userId,
      title: taskTitle,
      description: taskDescription,
      mode: mode,
      location: {
        latitude: latitude,
        longitude: longitude,
        address: enteredAddress,
        city: TaskLocation.city,
        province: TaskLocation.province
      },
      startDate: startDate.toString(),
      endDate: dueDate.toString(),
      budgetFrom: budgetFrom,
      budgetTo: budgetTo,
      taskImages: imageUris,
      taskStatus: taskStatus,
      customerconfirmed: false,
      providerconfirmed: false,
      completedTasks:0,
    };

    console.log("Task data to be saved:", taskData);

    const newTaskRef = push(tasksRef, taskData)
      .then((taskRef) => {
        console.log("Task details saved successfully");
        const taskId = taskRef.key; // Get the key of the newly created task
        console.log("New task ID: ", taskId);
        setPostedTask(taskId); // Save the task ID in state
      })
      .catch((error) => {
        console.error("Error saving task details: ", error);
      });
  };

  const renderUploadButton = () => (
    <View>
      <TouchableOpacity
        style={[styles.button, imageUris.length >= maxImages && styles.disabledButton]}
        onPress={pickAndUploadImage}
        disabled={imageUris.length >= maxImages}
      >
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      <Text>Images uploaded: {imageUris.length} / {maxImages}</Text>
    </View>
  );




  return (
    <>
      <View style={styles.navBar}>
        <View style={styles.logo}>
          <Image
            style={styles.img2}
            source={require("../../assets/Logo.png")}
          />
          <Text style={styles.logoText}>
            Work
            <Text style={[styles.logoText, styles.logoText2]}>{" Whiz"}</Text>
          </Text>
        </View>
        <View style={styles.menu}>
          <Pressable
            onPress={() => navigation.navigate("Hamburger1")}
            style={styles.hamburger}
          >
            <FontAwesomeIcon icon={faBars} size={34} color="black" />
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Details</Text>
          <View>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              value={taskTitle}
              onChangeText={setTaskTitle}
            />
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your Task"
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline
          />
          {renderUploadButton()}
          <View style={styles.imageContainer}>
            {imageUris.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.imageThumbnail} />
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Location</Text>

          <RadioButton.Group
            onValueChange={(newMode) => setMode(newMode)}
            value={mode}
          >
            <View style={styles.radioButtonGroup}>
              <RadioButton value="physical" />
              <Text onPress={() => setMode("physical")}>Physical</Text>
              <RadioButton value="online" />
              <Text onPress={() => setMode("online")}>Online</Text>
            </View>
          </RadioButton.Group>

          {/* <Picker
            selectedValue={location}
            onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Johar Town, Lahore" value="joharTown" />
            <Picker.Item label="Johar Town, Lahore" value="joharTown" />
            <Picker.Item label="Johar Town, Lahore" value="joharTown" />
          </Picker> */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter and Select Address on Map"
            value={enteredAddress}
            onChangeText={setEnteredAddress}
          />
          <MapView
            style={styles.map}
            region={TaskLocation ? { ...TaskLocation, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } : null}
            onPress={handleSelectLocation}
          >
            {TaskLocation && (
              <Marker
                coordinate={TaskLocation}
                title="Selected Location"
              />
            )}
          </MapView>

          <View style={styles.DateButtonConatiner}>
            {isStartDatePickerVisible && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setStartDatePickerVisibility(true)}
            >
              <Text style={styles.buttonText}>Select Start Date</Text>
            </TouchableOpacity>

            {isDueDatePickerVisible && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={onDueDateChange}
              />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDueDatePickerVisibility(true)}
            >
              <Text style={styles.buttonText}>Select Due Date</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Budget</Text>
          <TextInput
            style={styles.input}
            placeholder="From: e.g., 500"
            value={budgetFrom}
            keyboardType="numeric"
            onChangeText={(text) => setBudgetFrom(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="To: e.g., 1000"
            value={budgetTo}
            keyboardType="numeric"
            onChangeText={(text) => setBudgetTo(text)}
          />
          <Text style={styles.budgetText}>
            Estimated: Rs {budgetFrom} - Rs {budgetTo}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                Task Posted Successfully
              </Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.modalCloseButton}>×</Text>
              </Pressable>
            </View>

            <View style={styles.modalContent}>
              <View style={styles.modalContentTile}>
                <Text style={styles.modalInfoText}>Task Details:</Text>
                <Text style={styles.modalInfo}>Posted By: {username}</Text>
                <Text style={styles.modalInfo}>
                  Task Details: {taskDescription}
                </Text>
                <Text style={styles.modalInfo}>Task Type: {mode}</Text>
                <Text style={styles.modalInfo}>
                  Location: {TaskLocation ? `${enteredAddress}, ${TaskLocation.city}, ${TaskLocation.province}` : 'No location selected'}
                </Text>
                {/* Format the date as needed */}
                <Text style={styles.modalInfo}>
                  Posted on: {startDate.toDateString()}
                </Text>
              </View>
              {/* <Text style={styles.modalInstructionText}>
                Review Offers shows you the persons for this task.
              </Text>
              <Text style={styles.modalInstructionText}>
                Post a Task refers to the posting a Task page.
              </Text> */}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  // Navigate to TaskDetail screen and pass task details as route parameters
                  navigation.navigate("TaskDetail", {
                    taskId: postedTask,
                    taskTitle,
                    mode,
                    taskLocation: TaskLocation,
                  });
                }}
              >
                <Text style={styles.modalButtonText}>View Recommendations</Text>
              </TouchableOpacity>




            </View>
          </View>
        </View>
      </Modal>
    </>
  ); // Added closing tag for the JSX fragment
};

export default TaskForm;

const styles = StyleSheet.create({
  navBar: {
    flex: 0.14,
    // borderColor: "blue",
    // borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "rgb(222, 213, 205)",
  },
  logo: {
    flex: 0.8,
    // borderColor: "red",
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 40,
    marginLeft: 10
  },
  img2: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoText: {
    color: "#316B8C",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 35,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 35,
  },
  logoText2: {
    color: "#1E2643",
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  imageCounter: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
  menu: {
    flex: 0.2,
    // borderColor: "yellow",
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(222, 213, 205)",
    // gap: 0,
  },
  formSection: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    borderColor: "#ccc",
    borderWidth: 1,
    gap: 5,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  imageContainer: {
    flexDirection: 'row', // This will arrange the child Image components in a row
    justifyContent: 'flex-start', // Aligns children to the start of the main-axis
    alignItems: 'center', // Aligns children in the cross-axis
    marginVertical: 5,
    overflow: 'scroll' // Allows for scrolling if the content overflows
  },
  imageThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 5
  },
  button: {
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  DateButtonConatiner: {
    flexDirection: "row",
    gap: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  locationButton: {
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  locationButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  radioButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  map: {
    height: 200,
    marginBottom: 20,
  },
  // dateButton: {
  //   padding: 15,
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   alignItems: "center",
  //   marginBottom: 20,
  // },
  // dateButtonText: {
  //   color: "#333",
  //   fontSize: 16,
  // },
  budgetText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: "#fbfbf9",
    margin: 20,
    width: "80%",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "rgba(44, 139, 139, 0.75)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  modalHeader: {
    alignSelf: "stretch",
    borderRadius: 10,
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalHeaderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalCloseButton: {
    color: "white",
    fontSize: 27,
  },
  modalContent: {
    padding: 20,
    alignSelf: "stretch",
  },
  modalContentTile: {
    // alignSelf: 'stretch',
    backgroundColor: "#fefefe",
    padding: 10,
    // marginVertical: 20,
    borderRadius: 10,
    shadowColor: "rgba(44, 139, 139, 0.75)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
  },
  modalInfoText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalInstructionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

});