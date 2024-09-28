import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import { auth } from "../../firebase";
import { getDatabase, ref, update, get } from "firebase/database";

const Login = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState({ city: '', province: '', address: '' });

  const handleLogin = () => {
    console.log('Attempting to log in with', email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('Login successful:', userCredential.user);

        const userId = userCredential.user.uid; // Unique user ID from Firebase Authentication.
        const db = getDatabase();

        const customerRef = ref(db, `users/Customer/${userId}`);
        const serviceProviderRef = ref(db, `users/Service Provider/${userId}`);

        try {
          const customerSnapshot = await get(customerRef);
          const serviceProviderSnapshot = await get(serviceProviderRef);

          if (customerSnapshot.exists()) {
            console.log('User is a Customer');
            await AsyncStorage.setItem('@userRole', 'Customer');
            navigation.navigate('CustomerTabs');

            // Update location if available for customers only
            if (location.latitude && location.longitude) {
              update(customerRef, {
                location: {
                  address: location.address,
                  city: location.city,
                  province: location.province,
                  latitude: location.latitude,
                  longitude: location.longitude
                }
              }).then(() => {
                console.log("Customer location updated successfully.");
              }).catch((error) => {
                console.error("Failed to update customer location:", error);
                Alert.alert('Update Error', error.message);
              });
            } else {
              console.log("Location data is not available for update.");
            }
          } else if (serviceProviderSnapshot.exists()) {
            console.log('User is a ServiceProvider');
            await AsyncStorage.setItem('@userRole', 'ServiceProvider');
            navigation.navigate('ServiceProviderTabs');
          } else {
            console.log('User data not found, defaulting to customer view');
            await AsyncStorage.removeItem('@userRole');
            navigation.navigate('CustomerTabs');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Failed to fetch user data.');
        }
      })
      .catch((error) => {
        console.error('Login error:', error.code, error.message);
        Alert.alert('Login Error', error.message);
      });
  };

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Location Permission Required',
        'This app requires location permissions to function correctly. Please allow access to continue.',
        [
          { text: 'Cancel', onPress: () => console.log('Permission denied'), style: 'cancel' },
          { text: 'Allow', onPress: () => askPermissionAgain() },
        ],
        { cancelable: false }
      );
    } else {
      getLocationDetails();
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const askPermissionAgain = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      getLocationDetails();
    } else {
      // User has denied the permission again, handle accordingly
      Alert.alert('Permission Denied', 'Unfortunately, you will not be able to use this app without granting location access. You need to go to settings > App permissions > Location > Allow');
    }
  };

  const getLocationDetails = async () => {
    let loc = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (address.length > 0) {
      setLocation({
        city: address[0].city || '',
        province: address[0].region || '',
        address: `${address[0].name || ''}, ${address[0].street || ''}, ${address[0].city}, ${address[0].region}`.trim(),
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    }
  };

  useEffect(() => {
    // Load saved credentials if they exist
    const loadCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem('@savedEmail');
      const savedPassword = await AsyncStorage.getItem('@savedPassword');

      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setIsChecked(true); // Assume if credentials are saved, user opted for "Remember Me"
      }
    };

    loadCredentials();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Login to your</Text>
          <Text style={styles.text}>Account</Text>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address" // This helps users with the email keyboard
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={secureTextEntry}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={styles.iconEye} // Adjust this if you're keeping the eye icon for toggling password visibility
            >
              <FontAwesome
                name={secureTextEntry ? "eye-slash" : "eye"}
                size={22}
                color="#9e9e9e"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
            <Text style={styles.signupButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signInWrapper}>
            <Text style={styles.signInText}>Don't have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signInLink}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(222, 213, 205)",
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  textWrapper: {
    marginBottom: 40, // Space above the form
  },
  text: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingHorizontal: 20, // Padding on the sides
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    height: 50,
    width: '100%', // Make sure the input field takes the full width
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    borderRadius: 15,
    fontSize: 15,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  icon: {
    position: "absolute",
    right: 20,
  },
  iconEye: {
    position: "absolute",
    right: 20,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20, // Space above and below the checkbox
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#9e9e9e",
    marginLeft: 10,
  },
  signupButton: {
    width: "100%",
    borderRadius: 25,
    backgroundColor: "rgba(44, 139, 139, 0.85)",
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#9e9e9e",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#9c9c9c",
  },
  thrdpartyLoginButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginVertical: 20, // Space above and below the button
  },
  signInWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: "#9c9c9c",
  },
  signInLink: {
    fontSize: 16,
    color: "rgba(44, 139, 139, 0.85)",
    fontWeight: 'bold',
  },
});

export default Login;
