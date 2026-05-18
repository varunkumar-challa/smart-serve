const token = localStorage.getItem('adminToken');

const response = await fetch('http://localhost:4000/protected-endpoint', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
