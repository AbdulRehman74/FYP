import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image, Pressable } from 'react-native';
import axios from 'axios';
import { getDatabase, ref, update as dbUpdate, get as dbGet } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const ReviewAnalyzer = ({ route }) => {
  const { taskId } = route.params; // Assuming taskId is passed as route param from ViewTask
  const [reviewData, setReviewData] = useState('');
  const [reviewRating, setReviewRating] = useState(null);
  const [reviewClass, setReviewClass] = useState('');
  const [toxic, setToxic] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serviceProviderId, setServiceProviderId] = useState('');
  const [currentServiceProviderRating, setCurrentServiceProviderRating] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const db = getDatabase();
      const taskRef = ref(db, `PostedTasks/${taskId}`);

      const snapshot = await dbGet(taskRef);
      if (snapshot.exists()) {
        const taskData = snapshot.val();
        console.log('Fetched Task Data:', taskData);

        // Extract serviceProviderId from taskData
        const { assignedServiceProvider } = taskData;
        if (assignedServiceProvider) {
          setServiceProviderId(assignedServiceProvider);

          // Fetch service provider rating
          await fetchServiceProviderRating();
        } else {
          console.log('No assigned service provider found for task:', taskId);
          setError('No assigned service provider found for this task.');
        }
      } else {
        console.log(`Task with ID ${taskId} not found`);
        setError('Task not found. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching task details:', error);
      setError('Failed to fetch task details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceProviderRating = async () => {
    try {
      const db = getDatabase();
      const providerRef = ref(db, `users/Service Provider/${serviceProviderId}/Rating`);

      const snapshot = await dbGet(providerRef);
      if (snapshot.exists()) {
        const rating = snapshot.val();
        console.log('Fetched Service Provider Rating:', rating);
        setCurrentServiceProviderRating(rating);
      } else {
        console.log(`Rating for service provider ${serviceProviderId} not found`);
        setError('Rating not found for this service provider.');
      }
    } catch (error) {
      console.error('Error fetching service provider rating:', error);
      setError('Failed to fetch service provider rating. Please try again later.');
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewData.trim()) {
      Alert.alert('Error', 'Review text cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      const apiKey = 'AIzaSyBfBpLwxpMHudMVT9PdkKEbaWKvQQYnvXQ'; // Replace with your Google API key
      const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

      const requestData = {
        prompt: {
          text: `Analyze the following service provider review: '${reviewData}' and provide a rating out of 5, classify it as positive, negative, or neutral, and check for bad language in English, Hindi, and Urdu. Format the response as 'rating: X, class: Y, toxic: Z'.`
        }
      };

      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        const generatedText = response.data.candidates[0].output;
        console.log('Generated Text:', generatedText);

        // Parse rating, class, and toxic from generatedText
        const ratingRegex = /rating: (\d+), class: (\w+), toxic: (true|false)/i;
        const match = generatedText.match(ratingRegex);

        if (match) {
          const rating = parseInt(match[1]);
          const reviewClass = match[2];
          const toxic = match[3] === 'true';

          setReviewRating(rating);
          setReviewClass(reviewClass);
          setToxic(toxic);
          setError('');

          if (toxic) {
            // Prompt user to enter appropriate review
            Alert.alert(
              'Toxic Review Detected',
              'The review contains toxic language. Please enter an appropriate review.',
              [{ text: 'OK' }],
              { cancelable: false }
            );
          } else {
            // Calculate average rating
            const averageRating = (rating + currentServiceProviderRating) / 2;

            // Update service provider's rating
            await updateServiceProviderRating(averageRating);

            // Show success message and navigate back
            Alert.alert(
              'Review Submitted',
              'Your review has been successfully submitted.',
              [{ text: 'OK', onPress: () => navigation.goBack() }],
              { cancelable: false }
            );
          }
        } else {
          setError('Failed to analyze review. Please try again.');
        }
      } else {
        setError('Failed to generate content. Please try again.');
      }
    } catch (error) {
      console.error('Error analyzing review:', error);
      Alert.alert('Error', 'Failed to analyze review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateServiceProviderRating = async (averageRating) => {
    try {
      const db = getDatabase();
      const providerRef = ref(db, `users/Service Provider/${serviceProviderId}`);

      await dbUpdate(providerRef, {
        rating: averageRating,
      });

      console.log('Service provider rating updated successfully');
    } catch (error) {
      console.error('Error updating service provider rating:', error);
      throw error; // Propagate the error for handling in handleSubmitReview
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        {/* Logo */}
        <View style={styles.logo}>
          <Image
            style={styles.img2}
            source={require("../../assets/Logo.png")}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.logoText}>
            Work
            <Text style={[styles.logoText, styles.logoText2]}>{" Whiz"}</Text>
          </Text>
        </View>
        {/* Menu */}
        <View style={styles.menu}>
          <Pressable
            onPress={() => navigation.navigate("Hamburger1")}
            style={styles.hamburger}
          >
            <FontAwesomeIcon icon={faBars} size={34} color="black" />
          </Pressable>
        </View>              
      </View>
      <View style={styles.line} />

      <View style={styles.subhead}>
        <Text style={styles.bannerText}>Feedback</Text>
      </View>
      <View style={styles.line} />

      <Text style={styles.descriptionTitle}>
        Enter your feedback:
      </Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={6}
        value={reviewData}
        onChangeText={setReviewData}
      />
      <Button title="Submit Review" onPress={handleSubmitReview} style={styles.submitButton} />

      {reviewRating !== null && (
        <View style={[styles.resultContainer, { backgroundColor: '#ffffff' }]}>
          <Text style={styles.resultLabel}>Analysis Result:</Text>
          <Text style={styles.resultText}>Your Rating: {reviewRating}</Text>
          <Text style={styles.resultText}>Your Class: {reviewClass}</Text>
          <Text style={styles.resultText}>Toxic: {toxic ? 'Yes' : 'No'}</Text>
          {currentServiceProviderRating !== null && (
            <Text style={styles.resultText}>Service Provider's Current Rating: {currentServiceProviderRating}</Text>
          )}
        </View>
      )}

      <View style={styles.errorContainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(222, 213, 205)',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
  },
  logo: {
    flex: 0.2,
    alignItems: 'center',
  },
  img2: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    flex: 0.6,
    alignItems: 'center',
  },
  logoText: {
    color: '#316B8C',
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  logoText2: {
    color: '#1E2643',
  },
  menu: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  hamburger: {
    marginRight: 10,
  },
  line: {
    height: 3,
    backgroundColor: 'black',
    width: '100%',
    marginVertical: 10,
  },
  subhead: {
    alignItems: 'center',
  },
  bannerText: {
    color: 'black',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    minHeight: 150,
  },
  submitButton: {
    marginVertical: 10,
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  resultLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 3,
  },
  errorContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ReviewAnalyzer;
