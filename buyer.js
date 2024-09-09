// Sample products data with names
const sampleProducts = [
    {
        image: 'https://img.freepik.com/free-photo/bowl-ripe-potato-marble-table_114579-74893.jpg?w=1060&t=st=1725741233~exp=1725741833~hmac=d41edb40c391f8ce3608b783100661a6077defc3d0eced2f5339b51a80cb9f90',
        price: 30,
        quantityKgs: 100,
        name: 'Potato'
    },
    {
        image: 'https://www.world-grain.com/ext/resources/2022/10/25/Rice_AdobeStock_64819529_E.jpg?height=667&t=1666706505&width=1080',
        price: 40,
        quantityKgs: 50,
        name: 'Rice'
    },
    {
        image: 'https://www.scoular.com/wp-content/uploads/2020/10/malting-barley2_132585084.jpg',
        price: 35,
        quantityKgs: 75,
        name: 'Barley'
    },
    {
        image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/6/28/fresh-corn-on-the-cob-partially-shucked-on-dark-background.jpg.rend.hgtvcom.1280.1280.suffix/1687987003387.jpeg',
        price: 25,
        quantityKgs: 200,
        name: 'Corn'
    },
    {
        image: 'https://www.garden-products.co.uk/wp-content/uploads/2024/02/Tomatoes-scaled.jpeg',
        price: 25,
        quantityKgs: 300,
        name: 'Tomatoes'
    },
    {
        image: 'https://www.kew.org/sites/default/files/styles/original/public/2022-04/Carrots_-_Daucus_carota_subsp._sativus.jpg.webp?itok=PwFlGJEf',
        price: 45,
        quantityKgs: 150,
        name: 'Carrots'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzNm8fYho5qDL__4JXYqgASXmFlRrf10FBSw&s',
        price: 75,
        quantityKgs: 250,
        name: 'Pumpkin'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR32qCR8H3efmkkEb01IqbPJymuRuvLUicqdA&s',
        price: 95,
        quantityKgs: 260,
        name: 'Watermelon'
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1onpyIAZTTHv4oXQtcZ9tarM1mq6kriepA&s',
        price: 55,
        quantityKgs: 150,
        name: 'Milk'
    },
];

// Set sample products in local storage if not already set
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
}

// Variables for pagination
let currentPage = 1;
const productsPerPage = 6;

// Function to load products from localStorage or display sample products
function loadProducts(page = 1) {
    const products = JSON.parse(localStorage.getItem('products'));
    const availableProductsDiv = document.getElementById('available-products');

    // Calculate the start and end indices based on the page and limit
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Clear existing products
    if (page === 1) {
        availableProductsDiv.innerHTML = ''; // Clear only on the first load
    }

    // Display the products for the current page
    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name} Image" style="width: 100px; height: 100px;">
            <p>${product.name}</p>
            <p>Price: ₹ ${product.price} per kg</p>
            <p>Available: ${product.quantityKgs} kg</p>
            <input type="number" id="quantity-${product.name}" placeholder="Quantity (kg)" min="1" max="${product.quantityKgs}">
            <button onclick="buyNow('${product.name}', ${product.price}, ${product.quantityKgs})">Buy Now</button>
            <button onclick="addToCart('${product.name}', ${product.price}, ${product.quantityKgs}')">Add to Cart</button>
        `;
        availableProductsDiv.appendChild(productDiv);
    }
}

// Function to handle infinite scrolling
function handleInfiniteScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) { // Load more products when near the bottom
        currentPage++;
        loadProducts(currentPage);
    }
}

// Function to filter products based on search input
function filterProducts() {
    const input = document.getElementById('search-bar').value.toLowerCase();
    const productItems = document.getElementsByClassName('product-item');

    for (let i = 0; i < productItems.length; i++) {
        const productName = productItems[i].querySelector('p').innerText.toLowerCase();
        productItems[i].style.display = productName.includes(input) ? '' : 'none';
    }
}

// Function to handle buying a product
async function buyNow(name, price, availableQuantity) {
    const quantityInput = document.getElementById(`quantity-${name}`);
    const quantityToPurchase = quantityInput.value;

    if (quantityToPurchase && !isNaN(quantityToPurchase) && quantityToPurchase > 0) {
        // Store the selected product details in localStorage
        const selectedProduct = {
            name: name,
            image: document.querySelector(`img[alt="${name} Image"]`).src,
            price: price,
            quantity: quantityToPurchase
        };
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

        // Redirect to the order page
        window.location.href = 'order.html';
    } else {
        alert("Please enter a valid quantity.");
    }
}

// Function to handle adding a product to the cart
function addToCart(name, price, availableQuantity) {
    const quantityInput = document.getElementById(`quantity-${name}`);
    const quantityToAdd = quantityInput.value;

    if (quantityToAdd && !isNaN(quantityToAdd) && quantityToAdd > 0) {
        // Get the cart items from localStorage or initialize an empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Create the product object to add to the cart
        const productToAdd = {
            name: name,
            price: price,
            quantity: quantityToAdd
        };

        // Add the product to the cart
        cartItems.push(productToAdd);

        // Store the updated cart items in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert(`${name} has been added to your cart.`);
    } else {
        alert("Please enter a valid quantity.");
    }
}

// Load products when the page is loaded
window.onload = () => {
    loadProducts();
    window.addEventListener('scroll', handleInfiniteScroll);
};

// Add event listener for the search bar
document.getElementById('search-bar').addEventListener('keyup', filterProducts);