document.addEventListener("DOMContentLoaded", function () {
    const icingSelect = document.getElementById("icing");
    const quantitySelect = document.getElementById("quantity");
    const totalPriceSpan = document.getElementById("totalPrice");

    const basePrice = 2.49;

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
});
