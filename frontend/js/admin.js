document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminSignupForm = document.getElementById('admin-signup-form');
    const addAdminBtn = document.getElementById('addAdminBtn');

    // Handle Admin Login
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent form submission (page reload)

            // Get form data
            const phone = document.getElementById('admin-phone').value;
            const password = document.getElementById('admin-password').value;

            // Validate form data
            if (!phone || !password) {
                alert('Please enter both phone number and password');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phone, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Save the token in localStorage after login
                    localStorage.setItem('adminToken', data.token);
                    window.location.href = 'admin.html'; // Redirect to admin dashboard
                } else {
                    alert(data.error || 'Invalid login credentials');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Unable to login. Please try again.');
            }
        });
    }

    // Handle Admin Sign-Up
    if (adminSignupForm) {
        adminSignupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent form submission (page reload)

            // Get form data
            const name = document.getElementById('admin-name').value;
            const phone = document.getElementById('admin-phone').value;
            const password = document.getElementById('admin-password').value;

            // Validate form data
            if (!name || !phone || !password) {
                alert('Please fill in all fields');
                return;
            }

            // Get the token from localStorage (if logged in)
            // const token = localStorage.getItem('adminToken');
            // if (!token) {
            //     alert('You must be logged in to add an admin.');
            //     return;
            // }

            try {
                const response = await fetch('http://localhost:4000/admin/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}` // Add the token to the Authorization header
                    },
                    body: JSON.stringify({ name, phone, password }),
                });
                const data = await response.json();

                if (response.ok) {
                    alert('Admin account created successfully!');
                    window.location.href = 'admin.html'; // Redirect to login page
                } else {
                    alert(data.message || 'Something went wrong');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Unable to sign up. Please try again.');
            }
        });
    }

    // Handle Add Admin Button Click
    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', () => {
            window.location.href = 'add-admin.html';  // Redirect to add-admin.html page
        });
    }

    const addDishForm = document.getElementById('dish-form');

        if (addDishForm) {
            addDishForm.addEventListener('submit', async (e) => {
                e.preventDefault(); // Prevent form submission (page reload)
    
                // Get form data
                const name = document.getElementById('dish-name').value;
                const description = document.getElementById('dish-description').value;
                const price = document.getElementById('dish-price').value;
                const image = document.getElementById('dish-image').files[0];
    
                // Validate form data
                if (!name || !description || !price) {
                    alert('Please fill in all fields');
                    return;
                }
    
                // Prepare form data to send to the backend
                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('price', price);
                if (image) {
                    formData.append('image', image);
                }
    
                // Get the token from localStorage (if logged in)
                const token = localStorage.getItem('adminToken');
                if (!token) {
                    alert('You must be logged in to add a dish.');
                    return;
                }
    
                try {
                    const response = await fetch('http://localhost:4000', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}` // Add the token to the Authorization header
                        },
                        body: formData, // Sending form data, not JSON
                    });
                    const data = await response.json();
    
                    if (response.ok) {
                        alert('Dish added successfully!');
                        window.location.href = 'admin.html'; // Redirect to admin dashboard
                    } else {
                        alert(data.message || 'Something went wrong');
                    }
                } catch (error) {
                    console.log('Error:', error);
                    alert('Unable to add the dish. Please try again.');
                }
            });
        }


            const addDishBtn = document.getElementById('addDishBtn');
        
            // Redirect to add-dish.html when Add Dish button is clicked
            if (addDishBtn) {
                addDishBtn.addEventListener('click', () => {
                    window.location.href = 'add-dish.html';  // Redirect to add-dish.html page
                });
            }        
    
});
