// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !nav.contains(event.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    // Food Order Calculator
    const calculateBtn = document.getElementById('total');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // Get quantity
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            
            // Get dish price
            const dishSelect = document.getElementById('dishes');
            const dishPrice = parseFloat(dishSelect.value);
            const dishName = dishSelect.options[dishSelect.selectedIndex].text.split(' - ')[0];
            
            // Get delivery method
            let deliveryCost = 0;
            let deliveryMethod = 'Pick-up';
            const deliveryRadios = document.getElementsByName('delivery');
            for (let radio of deliveryRadios) {
                if (radio.checked) {
                    deliveryCost = parseFloat(radio.value);
                    deliveryMethod = radio.id === 'deliveryMethod' ? 'Delivery' : 'Pick-up';
                    break;
                }
            }
            
            // Get add-ons
            let extrasTotal = 0;
            let extrasList = [];
            const extras = document.getElementsByName('extras');
            for (let extra of extras) {
                if (extra.checked) {
                    extrasTotal += parseFloat(extra.value);
                    extrasList.push(extra.getAttribute('data-label'));
                }
            }
            
            // Calculate total
            const subtotal = dishPrice * quantity;
            const total = subtotal + deliveryCost + extrasTotal;
            
            // Display result
            let resultHTML = `<strong>You Ordered:</strong><br>`;
            resultHTML += `${quantity}x ${dishName} - $${subtotal.toFixed(2)}<br>`;
            resultHTML += `Delivery: ${deliveryMethod} - $${deliveryCost.toFixed(2)}<br>`;
            
            if (extrasList.length > 0) {
                resultHTML += `Add-ons: ${extrasList.join(', ')} - $${extrasTotal.toFixed(2)}<br>`;
            }
            
            resultHTML += `<br><strong>Total: $${total.toFixed(2)}</strong>`;
            
            document.getElementById('totalPrice').innerHTML = resultHTML;
        });
    }
});

