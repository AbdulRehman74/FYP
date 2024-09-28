import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Pressable, Alert ,Platform} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, onValue, update} from "firebase/database";
import { auth } from "../../firebase"; 
import { storage } from "../../firebase";





const Profile = ({ navigation }) => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // Initialize hasLocationPermission state
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [locationDetails, setLocationDetails] = useState({
    latitude: "",
    longitude: "",
    city: "",
    province: "",
  });
  const [avatarUrl, setAvatarUrl] = useState('');
 
  const handleAvatarSelection = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setAvatarUrl(source.uri); // To update the UI immediately
        uploadImage(source.uri); // For uploading to Firebase
      }
    });
  };
  
  const uploadImage = async (uri) => {
    const userId = auth.currentUser?.uid;
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const reference = storage().ref(`avatars/${userId}/${fileName}`);
  
    try {
      await reference.putFile(uploadUri);
      const url = await reference.getDownloadURL();
      setAvatarUrl(url); // Set the state with the new image URL for display
      console.log('Avatar uploaded and URL set:', url);
    } catch (e) {
      console.error(e);
      Alert.alert("Upload failed, please try again.");
    }
  };
  
  
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      setHasLocationPermission(false);
      return;
    }

    setHasLocationPermission(true);
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const addressArray = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (addressArray.length > 0) {
      const { city, region, street, name } = addressArray[0];
      // Constructing a user-friendly address string
      let address = name || street ? `${name || ''} ${street || ''}, ${city}, ${region}`.trim() : "Unknown Location";
      setLocationDetails({
        ...locationDetails,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        city: city || "Unknown City",
        province: region || "Unknown Region",
        address: address // This now contains a more descriptive place name
      });
    }
  };

  const loadProfileData = async () => {
    try {
      const savedName = await AsyncStorage.getItem("name");
      const savedPhone = await AsyncStorage.getItem("phone");
      const savedEmail = await AsyncStorage.getItem("email");
      setName(savedName || "");
      setPhone(savedPhone || "");
      setEmail(savedEmail || "");
    } catch (error) {
      Alert.alert("Error", "Failed to load profile data.");
    }
  };

  const [hasChanges, setHasChanges] = useState(false);

  const updateProfileData = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Error", "No user ID found.");
      return;
    }

    const dbRef = ref(getDatabase(), `users/${userId}`);
    update(dbRef, {
      username: name, // new value for username
      mobileNumber: phone, // new value for phone number
      email: email, // new value for email
      // No need to update 'location' or 'role' if they remain unchanged
    }).then(() => {
      // Update was successful
      Alert.alert("Update Successful", "Your profile has been updated.");
      setHasChanges(false);
    }).catch((error) => {
      // An error occurred
      Alert.alert("Update Failed", error.message);
    });
  };

  
  useEffect(() => {
    getCurrentLocation();
    const userId = auth.currentUser?.uid; // Ensure you have the correct path to the auth object
    if (!userId) {
      Alert.alert("Error", "No user ID found.");
      return;
    }

    const dbRef = ref(getDatabase(), `users/Customer/${userId}`);
    onValue(dbRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setName(userData.username || ""); // Using username as per your database
        setPhone(userData.mobileNumber || ""); // Using mobileNumber as per your database
        setEmail(userData.email || "");
        // Directly using the location field since it's a string in your database
        setLocationDetails(currentDetails => ({
          ...currentDetails,
          address: userData.location.address || "Location not set",
          city: userData.location.city || "",
          province: userData.location.province || "",
          latitude: userData.location.latitude || 0, // Default to 0 if latitude is not set
          longitude: userData.location.longitude || 0, // Default to 0 if longitude is not set
        }));
      }
    });
  }, []);

  // Define renderMapOrPlaceholder inside the Profile component
  const renderMapOrPlaceholder = () => {
    if (hasLocationPermission) {
      if (locationDetails.latitude && locationDetails.longitude) {
        // MapView should be shown with a Marker at the user's location
        return (
          <MapView
            style={styles.map}
            region={{
              latitude: parseFloat(locationDetails.latitude),
              longitude: parseFloat(locationDetails.longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            followUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(locationDetails.latitude),
                longitude: parseFloat(locationDetails.longitude),
              }}
              title={"Your Location"}
            />
          </MapView>
        );
      } else {
        // Location permission was granted but location is null (still fetching or failed)
        return <Text style={styles.fetchingLocationText}>Fetching location...</Text>;
      }
    } else {
      // User did not grant location permission or we have yet to ask
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Allow access to your location to display it on the map.</Text>
          <TouchableOpacity onPress={getCurrentLocation} style={styles.permissionButton}>
            <Text style={styles.permissionButtonText}>Grant Location Access</Text>
          </TouchableOpacity>
        </View>
      );
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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Profile</Text>
        </View>
        <View style={styles.avatarContainer}>
  <TouchableOpacity onPress={handleAvatarSelection}>
    {avatarUrl ? (
      <Avatar.Image size={100} source={{ uri: avatarUrl }} />
    ) : (
      <Avatar.Text
        size={100}
        label={name ? name[0].toUpperCase() : "F"}
        style={styles.avatar}
      />
    )}
  </TouchableOpacity>
</View>
        <TouchableOpacity
          onPress={updateProfileData}
          style={[styles.updateButton, hasChanges ? styles.buttonActive : styles.buttonInactive]}
          disabled={!hasChanges} // Disable button if no changes
        >
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setHasChanges(true);
            }}
            mode="outlined"
            outlineColor="rgba(44, 139, 139, 0.45)"
            activeOutlineColor="rgba(44, 139, 139, 0.85)"
            selectionColor="rgba(44, 139, 139, 0.85)"
          />
          <TextInput
            style={styles.input}
            label="Phone No"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setHasChanges(true);
            }}
            keyboardType="phone-pad"
            mode="outlined"
            outlineColor="rgba(44, 139, 139, 0.45)"
            activeOutlineColor="rgba(44, 139, 139, 0.85)"
            selectionColor="rgba(44, 139, 139, 0.85)"
          />
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(email);
              setHasChanges(true);
            }}
            disabled
            keyboardType="email-address"
            mode="outlined"
            outlineColor="rgba(44, 139, 139, 0.45)"
            activeOutlineColor="rgba(44, 139, 139, 0.85)"
            selectionColor="rgba(44, 139, 139, 0.85)"
          />
          <TextInput
            label={"Location"}
            mode="outlined"
            style={styles.input}
            value={locationDetails.address} // Display the user-friendly address here
            // Since this field might not be editable, you might want to remove onChangeText
            outlineColor="rgba(44, 139, 139, 0.45)"
            activeOutlineColor="rgba(44, 139, 139, 0.85)"
            selectionColor="rgba(44, 139, 139, 0.85)"
            disabled // Optional: Makes the field not editable
          />
          <TextInput
            label="City & Province"
            value={`${locationDetails.city}, ${locationDetails.province}`} // Display city and province
            mode="outlined"
            disabled // Similarly, consider if this should be editable or not
            style={styles.input}
            outlineColor="rgba(44, 139, 139, 0.45)"
            activeOutlineColor="rgba(44, 139, 139, 0.85)"
            selectionColor="rgba(44, 139, 139, 0.85)"
          />
        </View>
        {/* <View style={styles.mapContainer}>
          {userLocation && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                }}
                title={"Your Location"}
              />
            </MapView>
          ) : (
            // Fallback UI when location permission is denied
            <View style={styles.locationDeniedContainer}>
              <Text style={styles.locationDeniedText}>
                Location permission is not granted. Please enable access to show map.
              </Text>
            </View>
          )}
        </View> */}
        <View style={styles.mapContainer}>{renderMapOrPlaceholder()}</View>
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({

  buttonInactive: {
    backgroundColor: '#ccc', // Dull color
  },
  buttonActive: {
    backgroundColor: '#4CAF50', // Sharp color
  },

  navBar: {
    flex: 0.14,
    flexDirection: "row",
    backgroundColor: "rgb(222, 213, 205)",
    marginTop:10
  },
  logo: {
    flex: 0.8,
    alignItems: "center",
    flexDirection: "row",
    gap: 40,
    marginLeft:10
  },

  updateButton: {
    // Button styles
    margin: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    // Text styles
    color: "#ffffff",
    textAlign: "center",
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
  menu: {
    flex: 0.2,

    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgb(222, 213, 205)",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5F5F5",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 45,
    textAlign: "center",
    borderRadius: 10,
    width: "97%",
    backgroundColor: "rgba(44, 139, 139, 0.85)",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    gap: 10,
  },

  buttonContainer: {
    paddingHorizontal: 10,
    // paddingTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#e6e6e6", // A neutral background color
    borderRadius: 10, // Soften the corners
    overflow: "hidden", // Keep everything contained
  },
  fetchingLocationText: {
    textAlign: "center",
    color: "#555",
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  permissionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    borderRadius: 5,
    // elevation: 2,
  },
  permissionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});