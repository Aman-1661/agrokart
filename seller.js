// Function to store product details in localStorage
function storeProductDetails(product) {
    // Retrieve existing products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Add the new product to the products array
    products.push(product);

    // Store the updated products array in localStorage
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to handle form submission
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
        quantityKgs: cropQuantityKgs
    };

    // Store the product details in localStorage
    storeProductDetails(product);

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

