document.addEventListener("DOMContentLoaded", function () {
    const icingSelect = document.getElementById("icing");
    const quantitySelect = document.getElementById("quantity");
    const totalPriceSpan = document.getElementById("totalPrice");
    const addToCartButton = document.getElementById("cartButton");

    // Create a dictionary to store icing prices
    const icingPrices = {
        original: 0.00,
        sugarMilk: 0.00,
        vanillaMilk: 0.50,
        doubleChocolate: 1.50,
    };

    // Function to calculate and update the total price
    function updateTotalPrice() {
        let selectedIcing = icingSelect.value;
        let selectedQuantity = parseInt(quantitySelect.value);

        let icingPrice = icingPrices[selectedIcing];
        let selectedRoll = "Original";
        let basePrice = rolls[selectedRoll].basePrice;

        let quantityMultiplier = 1;
        if (selectedQuantity === 6) {
            quantityMultiplier = 5;
        } else if (selectedQuantity === 12) {
            quantityMultiplier = 10;
        }

        const total = (basePrice + icingPrice) * quantityMultiplier;
        totalPriceSpan.textContent = `$${total.toFixed(2)}`;
    }

    // Add event listeners to both selects
    icingSelect.addEventListener("change", updateTotalPrice);
    quantitySelect.addEventListener("change", updateTotalPrice);

    // Initial calculation
    updateTotalPrice();

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get("roll");

    const headerElement = document.querySelector('#rollName');
    headerElement.innerText = rollType + " Cinnamon Roll";

    const rollImage = document.querySelector('#roll-img');
    const lcName = rollType.toLowerCase();
    rollImage.src = "../assets/products/" + lcName + "-cinnamon-roll.jpg";

    const bunPrice = document.querySelector('#totalPrice');
    bunPrice.innerText = rolls[rollType].basePrice.toFixed(2);

    let cart = [];

    class Roll {
        constructor(rollType, rollGlazing, packSize, basePrice, imageFile) {
            this.type = rollType;
            this.glazing = rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
            this.imageFile = imageFile; // Include the imageFile property
        }
    }

    // Add event listener to the "Add to Cart" button
    addToCartButton.addEventListener("click", function () {
        const selectedIcing = icingSelect.value;
        const selectedQuantity = parseInt(quantitySelect.value);
        const basePrice = rolls[rollType].basePrice;
        const imageFile = rolls[rollType].imageFile; // Get the imageFile

        const rollDetails = new Roll(rollType, selectedIcing, selectedQuantity, basePrice, imageFile);

        cart.push(rollDetails);

        // Store the updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log("Cart:", cart);
    });

    // Load the cart from localStorage if it exists
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
});
