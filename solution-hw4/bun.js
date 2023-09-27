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

        // Use the dictionary to get the icing price
        let icingPrice = icingPrices[selectedIcing];

        // Get the base price from the rolls array
        let selectedRoll = "Original"; // Default to Original flavor
        let basePrice = rolls[selectedRoll].basePrice;

        // Adjust the multiplier based on the quantity selected
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

    // Parse URL and store as a variable
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get("roll");

    // Edit Header Based on Array
    const headerElement = document.querySelector('#rollName');
    headerElement.innerText = rollType + " Cinnamon Roll";

    // Edit Image Based on Array
    const rollImage = document.querySelector('#roll-img');
    rollImage.src = '../assets/products/' + rollType +"-cinnamon-roll.jpg";

    // Edit Price Based on the rolls array
    const bunPrice = document.querySelector('#totalPrice');
    bunPrice.innerText = rolls[rollType].basePrice.toFixed(2);

    // An array called Cart
    const cart = [];

    //roll constructor
    class Roll {
        constructor(rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing = rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
        }
    }

    // Add event listener to the "Add to Cart" button
    addToCartButton.addEventListener("click", function () {
        const selectedIcing = icingSelect.value;
        const selectedQuantity = parseInt(quantitySelect.value);
        const basePrice = rolls[rollType].basePrice;

        // Create an instance of the Roll class
        const rollDetails = new Roll(rollType, selectedIcing, selectedQuantity, basePrice);

        // Add the instance to the cart array
        cart.push(rollDetails);

        // Print the entire cart array to the console
        console.log("Cart:", cart);
    });
});
