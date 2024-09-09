// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle the forgot password form submission
document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const email = document.getElementById('email').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            document.getElementById('message').innerText = 'Password reset email sent!';
        })
        .catch((error) => {
            document.getElementById('message').innerText = error.message;
        });
});

// Function to handle password reset
function sendPasswordResetEmail(email) {
    auth.sendPasswordResetEmail(email)
        .then(() => {
            console.log('Password reset email sent!');
        })
        .catch((error) => {
            console.error('Error sending password reset email:', error);
        });
}

// Example usage
document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    sendPasswordResetEmail(email);
});