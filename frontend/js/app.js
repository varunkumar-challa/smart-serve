document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const token = localStorage.getItem('token');  
    async function fetchItems() {
        try {
            const response = await fetch('http://localhost:4000', {  
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  
                }
            });

            const data = await response.json();

            if (data.success) {
                displayItems(data.data); 
            } else {
                itemsContainer.innerHTML = '<p>No items found</p>';
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            itemsContainer.innerHTML = '<p>Unable to fetch items. Please try again later.</p>';
        }
    }

    function displayItems(items) {
        if (items.length === 0) {
            itemsContainer.innerHTML = '<p>No items found</p>';
            return;
        }
        const itemsHTML = items.map(item => {
            const imageUrl = `http://localhost:4000/${item.image}`; 

            return `
                <div class="col">
                    <div class="card h-100">
                        <img src="${imageUrl}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text"><strong>$${item.price.toFixed(2)}</strong></p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary add-to-cart" data-id="${item._id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        }).join(''); 
        itemsContainer.innerHTML = itemsHTML;

        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                addToCart(itemId);
            });
        });
    }

    function addToCart(itemId) {
        fetch(`http://localhost:4000/${itemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include token in the Authorization header
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const item = data.data;
                const itemInCart = cart.find(cartItem => cartItem._id === item._id);

                if (itemInCart) {
                    // If item is already in the cart, increase the quantity
                    itemInCart.quantity++;
                } else {
                    
                    cart.push({ ...item, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));

                alert(`${item.name} has been added to your cart!`);
            } else {
                alert('Failed to add item to cart');
            }
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
            alert('An error occurred. Please try again.');
        });
    }

    fetchItems();
});
