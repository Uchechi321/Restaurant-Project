// Background Image Slider

const slider = document.getElementById("backgroundSlider");

const images = [
    "Images/backgroundImage1.png",
    "Images/resturant2.jpg",
    "Images/resturant1.jpg"
];

let index = 0;

// Initial background
slider.style.backgroundImage = `url(${images[index]})`;

setInterval(() => {
    slider.style.opacity = 0;  // fade out

    setTimeout(() => {
        index = (index + 1) % images.length;
        slider.style.backgroundImage = `url(${images[index]})`;
        slider.style.opacity = 1; // fade in
    }, 500); // wait half of transition time
}, 4000);  // how long each image stays



// Order Form Calculation
let btn = document.getElementById("total");
btn.addEventListener("click", calculateTotal);

function calculateTotal() {

    // Quantity
    let quantity = parseInt(document.getElementById("quantity").value);

    // Dish and price
    let dishes = document.getElementById("dishes");
    let selectedOption = dishes.options[dishes.selectedIndex];
    let dishPrice = parseFloat(selectedOption.value);

    // Delivery selection
    let delivery = document.getElementsByName("delivery");
    let deliveryCost = 0;
    let deliveryMethod = "";

    for (let i = 0; i < delivery.length; i++) {
        if (delivery[i].checked) {
            deliveryCost = parseFloat(delivery[i].value);
            deliveryMethod = delivery[i].id;
        }
    }

    // Extra selections
    let extras = document.getElementsByName("extras");
    let extraNames = [];
    let extraCost = 0;

    for (let i = 0; i < extras.length; i++) {
        if (extras[i].checked) {
            extraNames.push(extras[i].dataset.label);
            extraCost += parseFloat(extras[i].value);
        }
    }

    // Total Cost
    let totalCost = quantity * (dishPrice + extraCost) + deliveryCost;

    // Output
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML =
        `You ordered <strong>${quantity}</strong> × <strong>${selectedOption.text}</strong><br>
         Delivery Method: <strong>${deliveryMethod}</strong><br>
         Extras: <strong>${extraNames.join(", ") || "None"}</strong><br><br>
         Total Price: <strong>$${totalCost.toFixed(2)}</strong>`;
}
