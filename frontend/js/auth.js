document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    if(loginForm){
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const phone = document.getElementById('login-phone').value;
            const password = document.getElementById('login-password').value;

            // Validate form fields
            if (!phone || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Disable submit button while waiting for response
            const loginButton = document.querySelector('#login-form button');
            loginButton.disabled = true;

            try {
                // Send login request to the backend
                const response = await fetch('http://localhost:4000/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, password })
                });

                const data = await response.json();

                if (response.ok) {
                    
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.existingUser));
                    // Redirect to the home page or dashboard
                    window.location.href = 'index.html';
                } else {
                    // Handle login errors
                    alert(data.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                // Re-enable submit button
                loginButton.disabled = false;
            }

            // Reset form fields after submission
            document.getElementById('login-form').reset();
        });
    }

    if(signupForm){
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const number = document.getElementById('number').value;
            const password = document.getElementById('password').value;

            // Validate form fields
            if (!username || !number || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Disable submit button while waiting for response
            const signupButton = document.querySelector('#signup-form button');
            signupButton.disabled = true;

            try {
                // Send sign-up request to the backend
                const response = await fetch('http://localhost:4000/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: username, phone: number, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // On successful sign-up, redirect to the login page
                    alert('Account created successfully! Please login.');
                    window.location.href = 'login.html';
                } else {
                    // Handle sign-up errors
                    alert(data.message || 'Sign up failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                // Re-enable submit button
                signupButton.disabled = false;
            }

            // Reset form fields after submission
            document.getElementById('signup-form').reset();
        });
    }
});
