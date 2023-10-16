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
    const lcName = rollType.toLowerCase();
    rollImage.src = "../assets/products/" + lcName + "-cinnamon-roll.jpg";

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

    // Create a function to map the original sizes to the desired sizes
    function mapSize(size) {
        const sizeMap = {
            "1": 1,
            "3": 3,
            "6": 5,
            "12": 10
        };
        return sizeMap[size] || size; // If the size is not in the map, use the original size
    }

    const shoppingCart = new Set();

    function addNewItem(rollType, rollGlazing, packSize, rollPrice, imageFile) {
        const roll = new Roll(rollType, rollGlazing, packSize, rollPrice, imageFile);
        shoppingCart.add(roll);
        return roll;
    }

    function createElement(roll) {
        const template = document.querySelector("#checkoutItemsTemplate");
        const clone = template.content.cloneNode(true);
        roll.element = clone.querySelector("#checkoutParent");
        const btnDelete = roll.element.querySelector("#deleteButton button");
        btnDelete.addEventListener("click", () => {
            removeItemFromCart(roll);
        });
        const rollListElement = document.querySelector("#checkoutList");
        rollListElement.prepend(roll.element);
        updateElement(roll);
    }

    function updateElement(roll) {
        const rollImageElement = roll.element.querySelector(".checkoutImages");
        const rollNameElement = roll.element.querySelector("#productName");
        const rollGlazingElement = roll.element.querySelector("#glazingOpt");
        const rollPackSizeElement = roll.element.querySelector("#packSize");
        const rollItemPriceElement = roll.element.querySelector(".itemPrice");
        rollImageElement.src = "../assets/products/" + roll.imageFile + "-cinnamon-roll.jpg";
        rollNameElement.textContent = roll.type + " Cinnamon Roll";
        rollGlazingElement.textContent = "Glazing: " + roll.glazing;
        rollPackSizeElement.textContent = "Pack Size: " + roll.size;
        rollItemPriceElement.textContent = "Price: $" + roll.basePrice;
    }

    function removeItemFromCart(roll) {
        shoppingCart.delete(roll);
        roll.element.remove();
        recalculateTotalCost();
    }

    const original = addNewItem("Original", "Sugar Milk", "1", "2.49", "original");
    const walnut = addNewItem("Walnut", "Vanilla Milk", "12", "3.49", "walnut");
    const raisin = addNewItem("Raisin", "Sugar Milk", "3", "2.99", "raisin");
    const apple = addNewItem("Apple", "Original", "3", "3.49", "apple");

    const reversedCart = Array.from(shoppingCart).reverse();

    for (const roll of reversedCart) {
        createElement(roll);
    }

    function calculateTotalCost(roll) {
        let glazingCost = 0;

        switch (roll.glazing) {
            case "Original":
                glazingCost = 0;
                break;
            case "Sugar Milk":
                glazingCost = 0;
                break;
            case "Vanilla Milk":
                glazingCost = 0.5;
                break;
            case "Double Chocolate":
                glazingCost = 1.5;
                break;
            default:
                glazingCost = 0;
        }

        const totalCost = (parseFloat(roll.basePrice) + glazingCost) * parseFloat(roll.size);
        return totalCost.toFixed(2);
    }

    for (const roll of reversedCart) {
        const totalCost = calculateTotalCost(roll);
        const productElement = roll.element.querySelector(".itemPrice");
        productElement.innerHTML = "$ " + totalCost;
    }

    function calculateTotalCartCost() {
        let totalCartCost = 0;

        for (const roll of shoppingCart) {
            const totalCost = calculateTotalCost(roll);
            totalCartCost += parseFloat(totalCost);
        }

        return totalCartCost.toFixed(2);
    }

    function recalculateTotalCost() {
        const totalCartCost = calculateTotalCartCost();
        const totalCostElement = document.querySelector("#cartTotal");
        totalCostElement.textContent = totalCartCost;
    }

    recalculateTotalCost();
});
