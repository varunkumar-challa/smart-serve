# --> Smart Serve  
### Efficient Order Management System for Canteens and Restaurants

Smart Serve is a full-stack restaurant and canteen order management web application developed using **Node.js, Express.js, MongoDB, HTML, CSS, JavaScript, and Bootstrap**.

The main objective of this project is to simplify the traditional food ordering process by allowing customers to place orders digitally from their tables instead of depending completely on manual waiter interactions.

This system helps restaurants and canteens improve service speed, reduce order mistakes, and provide a better customer experience through a clean and responsive digital platform.

---

# 📌 Project Objective

The goal of Smart Serve is to modernize restaurant operations by creating a digital order management system that:

- Reduces manual work
- Minimizes order errors
- Improves customer experience
- Speeds up food ordering
- Simplifies order tracking
- Helps kitchen staff manage orders efficiently

---

# --> Technologies Used

## Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication & Security
- JWT Authentication
- Bcrypt Password Hashing

## Other Tools & Libraries
- REST APIs
- Local Storage
- CORS
- dotenv

---

# > Features

## 👤 Customer Features
- User Registration and Login
- Browse Food Menu
- Add Food Items to Cart
- Update Item Quantity
- Remove Cart Items
- Place Orders
- Enter Table Number
- View Order Confirmation
- Responsive User Interface

## > Admin Features
- Manage Food Menu
- Monitor Orders
- Update Order Status
- Manage Customer Orders

## > System Features
- Secure Authentication
- Password Encryption
- Database Storage
- REST API Communication
- Real-time Order Workflow

---

# > How the Project Works

## --> Step 1 — User Registration/Login

Users can create an account using:
- Username
- Phone Number
- Password

Passwords are encrypted using bcrypt before storing them in MongoDB.

---

## --> Step 2 — Browse Menu

After login, users can:
- View available food items
- Check prices and descriptions
- Add items to cart

---

## --> Step 3 — Cart Management

The cart system allows users to:
- Increase quantity
- Remove items
- View total price

Cart data is temporarily stored using browser local storage.

---

## --> Step 4 — Checkout Process

During checkout:
- Users enter their table number
- Order data is sent to the backend using APIs
- Backend stores order details in MongoDB

---

## --> Step 5 — Order Processing

Kitchen/Admin side can:
- View incoming orders
- Update order status
- Track food preparation

Order statuses include:
- Pending
- Cooked
- Delivered

---

# > Concepts Used

This project helped in understanding:

- Full-stack web development
- Frontend and backend integration
- REST API development
- CRUD operations
- MongoDB database management
- JWT authentication
- Password hashing
- Event handling
- DOM manipulation
- Local storage handling
- MVC-like project structure

---

# > Project Structure

```txt
SmartServe
│
├── frontend
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── cart.html
│   ├── thank-you.html
│   │
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   │
│   │   ├── images
│   │   │
│   │   └── js
│   │       ├── app.js
│   │       └── auth.js
│
├── backend
│   ├── server.js
│   │
│   ├── models
│   │   ├── user.js
│   │   ├── admin.js
│   │   ├── items.js
│   │   ├── cart.js
│   │   └── orders.js
│   │
│   ├── routes
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── items.js
│   │
│   ├── middleware
│   │   └── adminauth.js
│   │
│   └── uploads
│
├── package.json
├── .env
└── README.md
```

---

# > User Interface Pages

## 🏠 Home Page
- Displays restaurant details
- Shows menu items
- Provides navigation options

## 🔑 Login Page
- Allows registered users to login

## 📝 Signup Page
- Allows new users to create accounts

## 🛒 Cart Page
- Displays selected food items
- Shows total amount
- Allows checkout process

## ✅ Thank You Page
- Displays successful order confirmation

---

# 🔐 Authentication System

The project uses JWT authentication for secure login handling.

## Authentication Flow

1. User logs in  
2. Server verifies credentials  
3. JWT token is generated  
4. Token is used for protected routes  

Passwords are encrypted using bcrypt before saving into the database.

---

# 🗄️ Database Models

## 👤 User Model
Stores:
- Name
- Phone Number
- Password

---

## 🍔 Item Model
Stores:
- Food Name
- Price
- Description
- Image

---

## 🛒 Cart Model
Stores:
- User ID
- Item IDs
- Quantity
- Total Amount

---

## 📦 Order Model
Stores:
- Customer ID
- Ordered Items
- Table Number
- Order Status
- Total Amount

---

# 🔄 Application Workflow

```txt
Customer
   ↓
Frontend UI
   ↓
REST API Requests
   ↓
Express.js Backend
   ↓
MongoDB Database
   ↓
Kitchen/Admin Processing
   ↓
Order Status Updates
```

---

# 📚 What I Learned

Through this project, I learned:

- How full-stack applications work
- How frontend and backend communicate
- How MongoDB stores application data
- How authentication systems are implemented
- How REST APIs are created
- How to structure large projects
- How to manage user sessions securely

I also improved my problem-solving skills and gained practical experience working with real-world web technologies.

---

# 🚀 Future Improvements

Some features planned for future versions:

- Online Payment Gateway
- QR Code Ordering
- Real-time Notifications
- Search & Filter System
- Food Recommendation System
- Admin Analytics Dashboard
- Email/SMS Alerts
- Mobile Optimization
- Order History
- Customer Reviews & Ratings

---

# ▶️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <repository-link>
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection
SECRET_TOKEN=your_secret_key
PORT=5000
```

---

## 4️⃣ Start Backend Server

```bash
npm start
```

---

## 5️⃣ Run Frontend

Open:

```txt
index.html
```

using:
- Browser
- Live Server Extension

---

# 🧪 Testing

The project was tested for:

- User Registration
- Login Authentication
- Cart Functionality
- Order Placement
- Database Storage
- Order Status Updates

---

# 📸 Screenshots

The project includes:

<img width="597" height="802" alt="Screenshot 2026-05-23 104132" src="https://github.com/user-attachments/assets/491de0bc-6f74-4c14-b7ff-711ec226f3a3" />
<img width="631" height="757" alt="Screenshot 2026-05-23 104115" src="https://github.com/user-attachments/assets/837bdca5-2ce9-4c53-8190-1fa4ec38f201" />
<img width="525" height="813" alt="Screenshot 2026-05-23 104231" src="https://github.com/user-attachments/assets/299747d8-d9a7-4a8d-b00f-ddf97b60f901" />
<img width="599" height="722" alt="Screenshot 2026-05-23 104206" src="https://github.com/user-attachments/assets/ebf104be-0808-412c-b551-7755b8e4cb00" />


---

# 📄 Conclusion

Smart Serve is a practical and scalable restaurant management solution that helps improve efficiency in canteens and restaurants through digital order management.

The project successfully demonstrates the implementation of:

- Full-stack development
- Authentication systems
- Database operations
- REST API integration
- Responsive web design

This project also provided hands-on experience with real-world software development concepts and modern web technologies.

# ⭐ Thank You

Thank you for checking out this project.  
Future updates and improvements will continue to enhance the system further.
