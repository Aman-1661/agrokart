const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// User model
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const User = mongoose.model('User', UserSchema);

// Send reset password email
const sendResetEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this email because you requested a password reset. 
        Please click on the following link, or paste this into your browser to complete the process: 
        http://localhost:3000/reset-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Reset email sent successfully!');
        }
    });
};

// Route to request a password reset
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send the reset email
    sendResetEmail(email, token);

    res.status(200).send('Reset link sent to your email address.');
});

// Route to reset password
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired.');
    }

    // Update the user's password
    user.password = newPassword; // You should hash the password before saving
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).send('Password has been reset successfully.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});