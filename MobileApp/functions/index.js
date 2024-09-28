/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const axios = require('axios');

exports.sendReviewToAPI = functions.database.ref('/reviews/{reviewId}')
    .onCreate(async (snapshot, context) => {
        // Get the newly created review
        const review = snapshot.val();

        try {
            // Send the review to your API
            const response = await axios.post('http://example.com/api/review_analysis', { review });

            // Import the JSON output back into Firebase
            await snapshot.ref.update({ analysis: response.data });
        } catch (error) {
            console.error('Error sending review to API:', error);
        }
    });
