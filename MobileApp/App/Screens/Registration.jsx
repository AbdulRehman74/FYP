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
    Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, push, get, update ,set,remove} from "firebase/database";
import { auth } from "../../firebase";
import { storage } from "../../firebase";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";
import * as Permissions from "expo-permissions";

const Registration = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [Category, setCategory] = useState("");
    const [location, setlocation] = useState(null);
    const [enteredAddress, setEnteredAddress] = useState("");
    const [references, setReferences] = useState(Array(5).fill(""));
    const [errorMessages, setErrorMessages] = useState([]);
    const [cnicUri, setCnicUri] = useState("");
    const [cvUri, setCvUri] = useState("");
    const [Age, setAge] = useState("");
    const [experience, setExperience] = useState("");
    const [UserData, setUserData] = useState("");
    const [canContinue, setCanContinue] = useState(false);
    

    const getPermissionAsync = async () => {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return false;
          }
        }
        return true;
      };

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser.uid;
            const db = getDatabase();
            const userRef = ref(db, `users/Customer/${userId}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setUserData(snapshot.val());
            } else {
                console.log("No data available");
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userId = auth.currentUser.uid; // Get the current user's ID
            const db = getDatabase();
            const userRef = ref(db, `users/Customer/${userId}`); // Adjust this path as needed
            const snapshot = await get(userRef);
            const userData = snapshot.val();
    
            if (userData) {
              setUsername(userData.username); 
              if (userData.location) {
                const { latitude, longitude, address, city, province } = userData.location;
                setlocation({ latitude, longitude, address, city, province });
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
        setCanContinue(
            Category.trim() !== "" &&
            enteredAddress.trim() !== "" &&
            cnicUri.trim() !== "" &&
            cvUri.trim() !== "" &&
            Age.trim() !== "" &&
            experience.trim() !== "" &&
            location !== null
        );
    }, [Category, enteredAddress, cnicUri, cvUri, Age, experience, location]);


  const handleContinue = async () => {
        if (!canContinue) return; // Ensure the function does nothing if called when canContinue is false

        try {
            // Use the URIs from state that were set after upload
            const updatedData = {
                ...UserData,
                category: Category,
                age: Age,
                experience: experience,
                location: {
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    address: enteredAddress,
                    city: location?.city || "Unknown",
                    province: location?.province || "Unknown"
                },
                cnicUri: cnicUri,
                cvUri: cvUri,
                rating:0,
                // Add other fields if necessary
            };

            await set(ref(getDatabase(), `users/Service Provider/${auth.currentUser.uid}`), updatedData);
            setModalVisible(true);
            const oldUserRef = ref(getDatabase(), `users/Customer/${auth.currentUser.uid}`);
            await remove(oldUserRef);
        } catch ( error) {
            console.error("Failed during the registration process:", error);
            alert("Failed to complete the registration. Please check your entries and try again.");
        }
    };


    const handleSelectLocation = async (event) => {
        try {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            setlocation({ latitude, longitude });

            // Reverse geocoding to fetch address, city, and province
            const locationDetails = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            const { address, city, region } = locationDetails[0]; // Assuming the first result is accurate


            setlocation({
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


    const pickAndUploadImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled && result.assets) {
            const uri = result.assets[0].uri;
            console.log(`${type} URI: `, uri);
            const uploadUrl = await uploadImage(uri, type);
            if (type === "CNIC") {
                setCnicUri(uploadUrl);
            } else {
                setCvUri(uploadUrl);
            }
        }
    };

    const uploadImage = async (uri, type) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
    
            // Force JPEG extension if you're converting it before upload
            const fileRef = storageRef(storage, `ServiceProvider/${type}/${Date.now()}.jpg`);
            const uploadTask = uploadBytesResumable(fileRef, blob);
    
            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`${type} upload is ${progress}% done`);
                    }, 
                    (error) => {
                        console.error("Upload error: ", error);
                        reject(error);
                    }, 
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log(`${type} available at`, downloadURL);
                        resolve(downloadURL);
                    }
                );
            });
        } catch (error) {
            console.error("Failed to upload image: ", error);
            throw error;
        }
    };
    




const uploadFile = async (uri, fileRefPath) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const fileRef = storageRef(storage, fileRefPath);
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);
        console.log("File uploaded successfully:", downloadURL);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};


    
const pickAndUploadFile = async (type) => {
    const hasPermission = await getPermissionAsync();
    if (!hasPermission) return;

    let result = await DocumentPicker.getDocumentAsync({
        type: ["*/*"], // Allows any file type
        copyToCacheDirectory: true,
    });

    if (!result.canceled) {
        const uri = result.assets[0].uri;
        let fileExtension = uri.split(".").pop();
        let fileRefPath = `ServiceProvider/Documents/${type}/${Date.now()}.${fileExtension}`;

        const uploadURL = await uploadFile(uri, fileRefPath);
        console.log(`${type} uploaded to:`, uploadURL);

        if (type === "CV") {
            setCvUri(uploadURL); // Ensure this is updated correctly
        }
        return uploadURL;
    } else {
        console.log("No file picked or operation cancelled.");
    }
};






    const handleReferenceChange = (index, value) => {
        const newReferences = [...references];
        newReferences[index] = value;
        setReferences(newReferences);

        // Perform your validation here
        if (!(/^\+92\d{10}$/.test(value) || /^\d{11}$/.test(value))) {
            // Set an error message specific to this index
            setErrorMessages((prev) => ({
                ...prev,
                [index]:
                    "Mobile number must be in +92 followed by 10 digits or a normal 11-digit format.",
            }));
        } else {
            // Clear error message for this index if the validation is passed
            setErrorMessages((prev) => {
                const newErrors = { ...prev };
                delete newErrors[index];
                return newErrors;
            });
        }

        // Check for duplicates
        const duplicates = newReferences.filter(
            (item, idx) => newReferences.indexOf(item) !== idx && item === value
        );
        if (duplicates.length > 0) {
            setErrorMessages((prev) => ({
                ...prev,
                [index]: "This contact number has already been entered.",
            }));
        }
    };

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
            <View style={styles.threButns}>
                <Text style={styles.mainText}>Earn Money</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.formSection}>
                    <Text style={styles.formTitle}>Register as Service Provider</Text>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => pickAndUploadImage("CNIC")}
                        >
                            <Text style={styles.buttonText}>Upload CNIC</Text>
                        </TouchableOpacity>
                        {cnicUri && (
                            <Image
                                source={{ uri: cnicUri }}
                                style={{ height: 200, width: 200, alignSelf: "center" }}
                            />
                        )}
                        <Text style={styles.label}>Category</Text>
                        <TextInput
                            style={styles.input}
                            value={Category}
                            onChangeText={setCategory}
                        />
                        <Text style={styles.label}>Enter Age</Text>
                        <TextInput
                            style={styles.input}
                            value={Age}
                            onChangeText={setAge}
                        />
                        <Text style={styles.label}>Past Experience</Text>
                        <TextInput
                            style={styles.inputMultiline}  // Use the style for multi-line input
                            multiline={true}  // Enable multi-line input
                            numberOfLines={4}  // Set the number of lines
                            value={experience}
                            onChangeText={setExperience}
                            placeholder="Describe your past experience"
                        />



                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => pickAndUploadFile("CV")}
                        >
                            <Text style={styles.buttonText}>
                                Upload CV/Resume/Certification
                            </Text>
                        </TouchableOpacity>
                        {cvUri && (
                            <Image
                                source={{ uri: cvUri }}
                                style={{ height: 200, width: 200, alignSelf: "center" }}
                            />
                        )}

                        <Text style={styles.label}>Professional References </Text>
                        {references.map((reference, index) => (
                            <View key={`reference-${index}`}>
                                <TextInput
                                    style={styles.input}
                                    value={reference}
                                    onChangeText={(text) => handleReferenceChange(index, text)}
                                    placeholder={`Reference ${index + 1} Contact Number`}
                                    keyboardType="phone-pad"
                                />
                                {errorMessages[index] && (
                                    <Text style={styles.errorText}>{errorMessages[index]}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.formTitle}>Confirm Location</Text>

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
                        region={
                            location
                                ? {
                                    ...location,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }
                                : null
                        }
                        onPress={handleSelectLocation}
                    >
                        {location && (
                            <Marker coordinate={location} title="Selected Location" />
                        )}
                    </MapView>
                </View>
                <TouchableOpacity
                    style={[styles.button, !canContinue ? styles.buttonDisabled : {}]}
                    onPress={handleContinue}
                    disabled={!canContinue}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
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
                            <Text style={styles.modalHeaderText}>You are Hired!</Text>
                            <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.modalCloseButton}>×</Text>
                            </Pressable>
                        </View>

                        <View style={styles.modalContent}>
                            <Text style={styles.modalInfo}>Start earning money now!</Text>
                        </View>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </>
    ); // Added closing tag for the JSX fragment
};

export default Registration;

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
        marginLeft: 10,
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
        marginLeft: 11,
    },
    logoText2: {
        color: "#1E2643",
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
    menu: {
        flex: 0.2,
        // borderColor: "yellow",
        // borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "blue",
    },
    threButns: {
        flex: 0.1,
        // borderColor: "red",
        // borderWidth: 5,
        backgroundColor: "rgba(44, 139, 139, 0.85)",
        justifyContent: "center",
    },
    mainText: {
        color: "#F5F5F5",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        fontSize: 32,
        fontStyle: "italic",
        fontWeight: "700",
        lineHeight: 35,
        textAlign: "center",
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
        textAlign: "center",
    },
    input: {
        borderWidth: 0.5,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    inputMultiline: {
        borderWidth: 0.5,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: "#fff",
        height: 100,  // Adjust height for multi-line input
        textAlignVertical: 'top'  // Ensure text starts from the top
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "rgba(44, 139, 139, 0.85)",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 25,
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
    buttonDisabled: {
        backgroundColor: "#ccc",
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
        fontWeight: "bold",
        marginBottom: 8,
    },
});
