import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Image, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../firebase"; // Ensure you import your Firebase auth configuration

const ServiceProviderHome = ({ navigation }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const userId = auth.currentUser.uid; // Get the current user's ID
      const db = getDatabase();
      const locationRef = ref(db, `users/Service Provider/${userId}/location`); // Use the user ID to construct the path
      get(locationRef).then((snapshot) => {
        if (snapshot.exists()) {
          const locData = snapshot.val();
          setLocation({
            latitude: locData.latitude,
            longitude: locData.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        } else {
          console.log("No location data available");
        }
      }).catch((error) => {
        console.error("Failed to fetch user location:", error);
      });
    };

    if (auth.currentUser) {
      fetchLocation();
    } else {
      console.log("No user is signed in");
    }
  }, []);

  const toggleSwitch = () => setIsAvailable(previousState => !previousState);

  return (
    <View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        {/* Logo */}
        <View style={styles.logo}>
          <Image
            style={styles.img}
            source={require("../../assets/Logo.png")}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.logoText}>
            Work<Text style={styles.logoText2}> Whiz</Text>
          </Text>
        </View>
        {/* Menu */}
        <View style={styles.menu}>
          <Pressable onPress={() => navigation.navigate("Hamburger1")}>
            <FontAwesomeIcon icon={faBars} size={34} color="black" />
          </Pressable>
        </View>
      </View>
      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          {isAvailable ? "Available" : "Unavailable"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#34C759" }}
          thumbColor={isAvailable ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isAvailable}
        />
      </View>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapView}
          initialRegion={location}
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={"Your Location"}
              description={"This is your current location"}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(222, 213, 205)",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 25,  // Increased padding to give more space
  },
  logo: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    flex: 2,
    alignItems: "center",
  },
  menu: {
    flex: 1,
    alignItems: "flex-end",
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 35,
    fontStyle: "italic",
    fontWeight: "700",
    color: "#316B8C",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  logoText2: {
    color: "#1E2643",
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  mapView: {
    width: '100%',
    height: '95%',
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#e6f7ff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C8B8B",
  },
});

export default ServiceProviderHome;
