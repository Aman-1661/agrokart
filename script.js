// Select the forms and message elements
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');
const loginErrorMessage = document.getElementById('login-error-message');
const registerErrorMessage = document.getElementById('register-error-message');
const loginSuccessMessage = document.getElementById('login-success-message');
const registerSuccessMessage = document.getElementById('register-success-message');

// Function to show messages
function showMessage(element, message, isSuccess) {
    element.textContent = message; // Set the message text
    element.style.display = 'block'; // Show the message
    element.style.color = isSuccess ? '#4CAF50' : '#FF0000'; // Green for success, red for error
    // Optional: Hide the message after a few seconds
    setTimeout(function() {
        element.style.display = 'none'; // Hide the message
    }, 3000); // 3000 milliseconds = 3 seconds
}

// Event listener for the login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Basic validation
    if (username === "" || password === "") {
        showMessage(loginErrorMessage, 'Please fill in all fields.', false);
    } else if (!validateEmail(username)) {
        showMessage(loginErrorMessage, 'Please enter a valid email address.', false);
    } else {
        showMessage(loginSuccessMessage, 'Login form submitted!', true);
        loginErrorMessage.style.display = 'none'; // Hide error message if any
        // Redirect to dashboard after successful login
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }
});

// Event listener for the registration form submission
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (firstName === "" || lastName === "" || email === "" || username === "" || password === "" || confirmPassword === "") {
        showMessage(registerErrorMessage, 'Please fill in all fields.', false);
    } else if (!validateEmail(email)) {
        showMessage(registerErrorMessage, 'Please enter a valid email address.', false);
    } else if (password.length < 6) {
        showMessage(registerErrorMessage, 'Password must be at least 6 characters long.', false);
    } else if (password !== confirmPassword) {
        showMessage(registerErrorMessage, 'Passwords do not match.', false);
    } else {
        showMessage(registerSuccessMessage, 'Registration form submitted!', true);
        registerErrorMessage.style.display = 'none'; // Hide error message if any
        // Redirect to dashboard after successful registration
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }
});

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return re.test(String(email).toLowerCase());
}

// Function to open the account modal
function openAccount() {
    document.getElementById("account-modal").style.display = "block";
}

// Function to close the account modal
function closeAccount() {
    document.getElementById("account-modal").style.display = "none";
}

// Function to set user details dynamically
function setUserDetails(username, email, accountType) {
    document.getElementById("username").innerText = username;
    document.getElementById("username-details").innerText = username;
    document.getElementById("email-details").innerText = email;
    document.getElementById("account-type-details").innerText = accountType;
}

// Example user data for demonstration
const users = [
    { username: "Anubhav Raj", email: "rajanubhav668@gmail.com", accountType: "Buyer" },
    { username: "Anchita Marodia", email: "anchitamarodia07@gmail.com", accountType: "Seller" },
    { username: "Afaque Imam Khan", email: "afaqueimamkhan@gmail.com", accountType: "Buyer" },
    { username: "Kishan Kumar", email: "kishan5566@gmail.com", accountType: "Buyer" },
    { username: "Pushpa Devangan", email: "pushpadev798@gmail.com", accountType: "Buyer" },
    { username: "Maina Bhusan", email: "Maina1234@gmail.com", accountType: "Seller" },
    { username: "Kishore Kishan", email: "kishorekishan55@gmail.com", accountType: "Seller" },
    { username: "Kiran Raj", email: "kiran668@gmail.com", accountType: "Buyer" },
    { username: "Siya Raj", email: "siya668@gmail.com", accountType: "Buyer" }
];

// Function to set background image based on account type
function setBackgroundImage(accountType) {
    const backgroundImage = document.querySelector('.background-image');

    if (accountType === 'Seller') {
        backgroundImage.style.backgroundImage = 'url(https://img.freepik.com/free-photo/closeup-shot-rice-plant-sunset-with-plantation-background_181624-42264.jpg?t=st=1725705722~exp=1725709322~hmac=bb7af1c56f79d95293ead1ac1686c29288edad769417120013ddbb3fe5676bfd&w=1060)';
    } else {
        backgroundImage.style.backgroundImage = 'url(https://www.adgully.com/img/800/202004/agri-ecommerce_2.jpg)';
    }
}

// Call this function when the dashboard loads
window.onload = function() {
    // Simulate fetching the user data from local storage or a database
    const currentUser = users[0]; // For demonstration, using the first user
    if (currentUser) {
        setUserDetails(currentUser.username, currentUser.email, currentUser.accountType);
    } else {
        console.error('User not found');
    }
};
// Array to hold product details
const products = [];
const sellingHistory = [];

// Function to open the Selling Products modal
function openSellingProducts() {
    document.getElementById("selling-products-modal").style.display = "block";
}

// Function to close the Selling Products modal
function closeSellingProducts() {
    document.getElementById("selling-products-modal").style.display = "none";
}

// Function to open the Managing Products modal
function openManagingProducts() {
    document.getElementById("managing-products-modal").style.display = "block";
    displayProducts(); // Display products when the modal opens
}

// Function to close the Managing Products modal
function closeManagingProducts() {
    document.getElementById("managing-products-modal").style.display = "none";
}

// Function to open the Selling History modal
function openSellingHistory() {
    document.getElementById("selling-history-modal").style.display = "block";
    displaySellingHistory(); // Display selling history when the modal opens
}

// Function to close the Selling History modal
function closeSellingHistory() {
    document.getElementById("selling-history-modal").style.display = "none";
}

// Event listener for the crop upload form submission
document.getElementById('crop-upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const cropImage = document.getElementById('crop-image').files[0];
    const cropPrice = document.getElementById('crop-price').value;
    const cropQuantityGrams = document.getElementById('crop-quantity-grams').value;
    const cropQuantityKgs = document.getElementById('crop-quantity-kgs').value;

    // Basic validation
    if (!cropImage || cropPrice <= 0 || cropQuantityGrams <= 0 || cropQuantityKgs <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Create a product object
    const product = {
        image: URL.createObjectURL(cropImage), // Create a URL for the uploaded image
        price: cropPrice,
        quantityGrams: cropQuantityGrams,
        quantityKgs: cropQuantityKgs,
        buyers: 0, // Initialize number of buyers
        totalQuantitySold: 0 // Initialize total quantity sold
    };

    // Add the product to the products array
    products.push(product);

    // Display success message
    showSuccessMessage('Crop uploaded successfully!');

    // Close the modal after submission
    closeSellingProducts();

    // Display updated products in the Managing Products modal
    displayProducts();
});

// Function to display products in the Managing Products modal
function displayProducts() {
    const tableBody = document.getElementById('products-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="Crop Image" style="width: 50px; height: 50px;"></td>
            <td>${product.price}</td>
            <td>${product.quantityGrams}</td>
            <td>${product.quantityKgs}</td>
            <td>${product.buyers}</td>
            <td>${product.totalQuantitySold}</td>
            <td><button onclick="simulatePurchase(${index})">Purchase</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to simulate a purchase
function simulatePurchase(index) {
    const quantityToPurchase = prompt("Enter quantity to purchase (grams):");
    if (quantityToPurchase && !isNaN(quantityToPurchase) && quantityToPurchase > 0) {
        const product = products[index];
        const gramsAvailable = parseInt(product.quantityGrams);
        
        if (gramsAvailable >= quantityToPurchase) {
            product.buyers += 1; // Increment the number of buyers
            product.totalQuantitySold += parseInt(quantityToPurchase); // Update total quantity sold
            product.quantityGrams -= quantityToPurchase; // Decrease available grams

            // Add to selling history
            addToSellingHistory(product, quantityToPurchase);

            displayProducts(); // Refresh the product display
            showSuccessMessage(`Purchased ${quantityToPurchase} grams of the product!`);
        } else {
            alert("Not enough quantity available to complete this purchase.");
        }
    }
}

// Function to add to selling history
function addToSellingHistory(product, quantitySold) {
    const historyEntry = {
        image: product.image,
        price: product.price,
        quantitySold: quantitySold,
        buyers: product.buyers
    };
    sellingHistory.push(historyEntry);
}

// Function to display selling history
function displaySellingHistory() {
    const tableBody = document.getElementById('selling-history-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    sellingHistory.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${entry.image}" alt="Crop Image" style="width: 50px; height: 50px;"></td>
            <td>${entry.price}</td>
            <td>${entry.quantitySold}</td>
            <td>${entry.buyers}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to show success message
function showSuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successMessage.style.display = 'block';

    // Hide the message after a few seconds
    setTimeout(function() {
        successMessage.style.display = 'none';
    }, 3000);
}
