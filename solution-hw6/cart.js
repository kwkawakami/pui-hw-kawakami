document.addEventListener("DOMContentLoaded", function () {
    function mapSize(size) {
        const sizeMap = {
            "1": 1,
            "3": 3,
            "6": 5,
            "12": 10
        };
        return sizeMap[size] || size;
    }

    class Roll {
        constructor(rollType, rollGlazing, packSize, rollPrice, imageFile) {
            this.type = rollType;
            this.glazing = rollGlazing;
            this.size = mapSize(packSize);
            this.basePrice = rollPrice;
            this.imageFile = imageFile;
            this.icingPrice = 0; // Default icingPrice is 0
            this.element = null;
        }
    }

    const shoppingCart = new Set();

    // Function to create an HTML element for a Roll object and calculate the total cost
    function createElement(rollType, rollGlazing, packSize, rollPrice, imageFile) {
        const roll = new Roll(rollType, rollGlazing, packSize, rollPrice, imageFile);
        
        // Assign icingPrice based on rollGlazing
        switch (roll.glazing) {
            case "vanillaMilk":
                roll.icingPrice = 0.5;
                break;
            case "doubleChocolate":
                roll.icingPrice = 1.5;
                break;
            // For "original" and "sugarMilk", icingPrice remains 0 (already set in the constructor)
        }

        shoppingCart.add(roll);
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
        saveCartToLocalStorage();
        recalculateTotalCost();
    }

    // Function to update the HTML element for a Roll object
    function updateElement(roll) {
        const rollImageElement = roll.element.querySelector(".checkoutImages");
        const rollNameElement = roll.element.querySelector("#productName");
        const rollGlazingElement = roll.element.querySelector("#glazingOpt");
        const rollPackSizeElement = roll.element.querySelector("#packSize");
        const rollItemPriceElement = roll.element.querySelector(".itemPrice");
        rollImageElement.src = "../assets/products/" + roll.imageFile;
        rollNameElement.textContent = roll.type + " Cinnamon Roll";
        
        // Format and set roll.glazing in rollGlazingElement
        let formattedGlazing = roll.glazing;
        if (roll.glazing === "original") {
            formattedGlazing = "Original";
        } else if (roll.glazing === "sugarMilk") {
            formattedGlazing = "Sugar Milk";
        } else if (roll.glazing === "vanillaMilk") {
            formattedGlazing = "Vanilla Milk";
        } else if (roll.glazing === "doubleChocolate") {
            formattedGlazing = "Double Chocolate";
        }
        rollGlazingElement.textContent = "Glazing: " + formattedGlazing;
    
        rollPackSizeElement.textContent = "Pack Size: " + roll.size;
    
        // Calculate the total cost
        const totalCost = (parseFloat(roll.basePrice) + parseFloat(roll.icingPrice)) * parseFloat(roll.size);
        rollItemPriceElement.textContent = "Price: $" + totalCost.toFixed(2);
    }

    // Function to add a Roll object to the shopping cart
    function addRollToCart(rollType, rollGlazing, packSize, rollPrice, imageFile) {
        createElement(rollType, rollGlazing, packSize, rollPrice, imageFile);
    }

    // Function to remove a Roll from the shopping cart
    function removeItemFromCart(roll) {
        shoppingCart.delete(roll);
        roll.element.remove();
        saveCartToLocalStorage();
        recalculateTotalCost();
    }

    // Load cart items from local storage
    function loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cartArray = JSON.parse(storedCart);
            for (const item of cartArray) {
                const { type, glazing, size, basePrice, imageFile } = item;
                createElement(type, glazing, size, basePrice, imageFile);
            }
        }
    }

    // Save the shopping cart to local storage
    function saveCartToLocalStorage() {
        const cartArray = Array.from(shoppingCart);
        localStorage.setItem('cart', JSON.stringify(cartArray));
    }

    // Function to calculate the total cost of a Roll
    function calculateTotalCost(roll) {
        const totalCost = (parseFloat(roll.basePrice) + parseFloat(roll.icingPrice)) * parseFloat(roll.size);
        return totalCost.toFixed(2);
    }

    // Function to calculate the total cost of the entire shopping cart
    function calculateTotalCartCost() {
        let totalCartCost = 0;

        for (const roll of shoppingCart) {
            totalCartCost += parseFloat(calculateTotalCost(roll));
        }

        return totalCartCost.toFixed(2);
    }

    // Function to update the total cost displayed in the HTML
    function recalculateTotalCost() {
        const totalCartCost = calculateTotalCartCost();
        const totalCostElement = document.querySelector("#cartTotal");
        totalCostElement.textContent = totalCartCost;
    }

    // Load cart items from local storage when the page loads
    loadCartFromLocalStorage();
    recalculateTotalCost();
});
