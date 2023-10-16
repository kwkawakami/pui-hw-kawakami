document.addEventListener("DOMContentLoaded", function () {
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

    class Roll {
        constructor(rollType, rollGlazing, packSize, rollPrice, imageFile) {
            this.type = rollType;
            this.glazing = rollGlazing;
            this.size = mapSize(packSize); // Map the size
            this.basePrice = rollPrice;
            this.imageFile = imageFile;
            this.element = null; // Initialize the element property
        }
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
