# FoodHub - Online Food Delivery Web Application

A modern, fully-featured online food delivery application built with **Flask** backend and responsive **HTML/CSS/JavaScript** frontend.

**Converted from the original Tkinter desktop application to a professional web-based platform.**

## 🚀 Features

### User Features
- ✅ **User Registration & Login** - Secure authentication with password hashing
- ✅ **Food Menu Display** - Browse all available food items with descriptions and prices
- ✅ **Search Functionality** - Real-time search through menu items
- ✅ **Shopping Cart** - Add/remove items, update quantities
- ✅ **Checkout** - Complete order with delivery address and phone number
- ✅ **Order History** - View past orders and their details
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ✅ **Modern UI** - Clean, attractive, and professional interface

### Technical Features
- 🔒 **Secure Password Hashing** - Werkzeug security for user passwords
- 📦 **RESTful API** - Backend API endpoints for all operations
- 💾 **SQLite Database** - Persistent storage for users, orders, and menu items
- 🎨 **Bootstrap 5** - Responsive CSS framework
- ⚡ **Real-time Updates** - Dynamic cart updates with fetch API
- 📱 **Mobile Optimized** - Touch-friendly interface

## 📁 Project Structure

```
py-project/
├── app.py                      # Main Flask application
├── config.py                   # Configuration settings
├── setup_db.py                 # Database setup script
├── requirements.txt            # Python dependencies
│
├── templates/                  # HTML Templates
│   ├── base.html              # Base template with navbar
│   ├── login.html             # Login/Register page
│   ├── register.html          # Standalone register page
│   ├── menu.html              # Food menu display
│   ├── checkout.html          # Order checkout
│   ├── order_history.html     # Order history page
│   └── 404.html               # Error page
│
├── static/                     # Static files (CSS, JS, Images)
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   ├── auth.css           # Authentication page styles
│   │   ├── menu.css           # Menu page styles
│   │   ├── checkout.css       # Checkout page styles
│   │   └── orders.css         # Order history styles
│   │
│   └── js/
│       ├── main.js            # Cart management & common functions
│       ├── auth.js            # Login/register logic
│       ├── menu.js            # Menu & search functionality
│       ├── checkout.js        # Checkout logic
│       └── orders.js          # Order history logic
│
├── images/                     # Food images (optional)
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- **Python 3.7+**
- **pip** (Python package manager)

### Step 1: Clone/Download the Project
```bash
cd py-project
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Setup SQLite Database

Run the setup script:

```bash
python setup_db.py
```

This will:
- Create the `food_ordering.db` SQLite file
- Create all necessary tables (users, menu_items, orders, order_items)
- Insert sample users and menu items

### Step 4: Update Database Path (optional)

Edit `config.py` and update the database file path if needed:

```python
DB_PATH = "food_ordering.db"
```

## 🚀 Running the Application

### Start the Flask Development Server
```bash
python app.py
```

The application will be available at: **http://localhost:5000**

### Console Output
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

## 👤 Test Accounts

After running `setup_db.py`, you can login with:

**Regular User:**
- Username: `john_doe`
- Password: `password` (register with this password)

**Admin User:**
- Username: `admin`
- Password: `password` (register with this password)

## 📖 How to Use

### 1. **Registration**
   - Click on the "Register" tab
   - Fill in username, password, and confirm password
   - Click "Create Account"

### 2. **Login**
   - Enter your username and password
   - Click "Login"

### 3. **Browse Menu**
   - View all available food items
   - Use search bar to find specific items
   - Click "Add" to add items to cart

### 4. **Shopping Cart**
   - Click the cart icon in the top-right
   - Adjust quantities or remove items
   - View total price
   - Click "Checkout" when ready

### 5. **Checkout**
   - Enter delivery address
   - Enter phone number
   - Select payment method
   - Review order summary
   - Click "Place Order"

### 6. **View Orders**
   - Click "My Orders" in navigation
   - View all your past orders
   - Click "View Details" to see order items

## 🎨 UI/UX Features

- **Color Scheme**: Modern indigo and orange theme
- **Responsive Grid**: Cards adapt to screen size
- **Smooth Animations**: Hover effects and transitions
- **Icons**: Font Awesome icons throughout
- **Dark Mode Ready**: Easy to adapt for dark mode
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🔌 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /register` - User registration
- `GET /logout` - User logout

### Menu & Items
- `GET /api/menu` - Get all menu items
- `GET /api/search?q=query` - Search menu items

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/<id>` - Update item quantity
- `DELETE /api/cart/remove/<id>` - Remove item
- `POST /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/place-order` - Place new order
- `GET /api/orders` - Get user's orders
- `GET /api/order-details/<id>` - Get order details

## 🛡️ Security Features

- ✅ **Password Hashing**: Using Werkzeug security
- ✅ **Session Management**: Flask sessions for user authentication
- ✅ **SQL Injection Prevention**: Parameterized queries
- ✅ **CSRF Protection**: Can be enhanced with Flask-WTF
- ✅ **User Authorization**: Orders are tied to authenticated users

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'flask'"
```bash
pip install -r requirements.txt
```

### "MySQL Connection Error"
- Ensure MySQL is running
- Check database credentials in `config.py`
- Run `python setup_db.py` to create database

### "Port 5000 already in use"
Edit `app.py` and change the port:
```python
app.run(debug=True, host='localhost', port=5001)
```

### "Cart not saving"
- Clear browser cookies/localStorage
- Check browser console for JavaScript errors
- Verify Flask is running

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### For Production:

1. **Disable Debug Mode**
   ```python
   app.run(debug=False)
   ```

2. **Use Production Server** (Gunicorn)
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

3. **Set Strong Secret Key**
   ```python
   app.secret_key = 'your-long-random-secret-key'
   ```

4. **Use Environment Variables**
   - Store database credentials in `.env` file
   - Load using python-dotenv

5. **Enable HTTPS/SSL**
   - Use Nginx reverse proxy
   - Get SSL certificate from Let's Encrypt

## 📝 Future Enhancements

- [ ] Admin dashboard for managing orders
- [ ] User profile management
- [ ] Real-time order tracking
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Review and ratings system
- [ ] Discount codes and promotions
- [ ] Multiple delivery address support
- [ ] Order cancellation
- [ ] Dark mode support

## 📞 Support

For issues or questions, check:
- Flask Documentation: https://flask.palletsprojects.com/
- MySQL Documentation: https://dev.mysql.com/doc/
- Bootstrap Documentation: https://getbootstrap.com/docs/

## 📄 License

This project is open source and available for educational purposes.

## 🎓 Credits

Original Tkinter version | Converted to Flask web application

---

**Enjoy using FoodHub! 🍕🍔🍜**


1. **Install MySQL & Start Server:**
   Ensure MySQL (e.g., via XAMPP or MySQL Workbench) is installed and the service is running on your machine (default port 3306).

2. **Setup the Database:**
   - Open your MySQL CLI or Workbench.
   - Copy the contents of `schema.sql`.
   - Execute the SQL script. This will create the `food_ordering_db` database, tables, and insert sample food items and a default admin user.

3. **Configure Database Connection:**
   - Open `config.py`.
   - Update `DB_USER` and `DB_PASSWORD` if your local MySQL root user has a password. By default, it uses `root` with no password.

4. **Install Python Dependencies:**
   - Open your terminal or command prompt in the project folder.
   - Run the following command:
     ```bash
     pip install -r requirements.txt
     ```
     *(This installs `mysql-connector-python` and `Pillow` for images).*

5. **Run the Application:**
   - In the terminal, execute:
     ```bash
     python main.py
     ```
   - **Login Credentials:**
     - You can register a new user from the GUI.
     - Default Admin: Username `admin`, Password `admin123`

---

## Frequently Asked Questions (Viva Questions)

**Q1: What is the purpose of `__init__` in your classes?**
**Answer:** The `__init__` method is a constructor. It initializes the class attributes when an object is created. For example, in `LoginWindow`, it sets up the root window dimensions, colors, and the initial database connection.

**Q2: How does the application connect to the database?**
**Answer:** It uses the `mysql.connector` library. In `db.py`, the `Database` class establishes a connection using the `host`, `user`, `password`, and `database` name provided in `config.py`. It creates a `cursor` to execute SQL queries.

**Q3: Explain the use of `try...except` blocks in `db.py`.**
**Answer:** `try...except` blocks handle runtime errors gracefully. If the database server is down or a SQL syntax error occurs, the `except mysql.connector.Error` block catches the exception and prevents the application from crashing abruptly, often showing a messagebox to the user instead.

**Q4: What is a `Treeview` widget?**
**Answer:** `ttk.Treeview` is a Tkinter widget used to display data in a tabular format with rows and columns. In this project, it is used for the Shopping Cart and the Order History tables.

**Q5: How is data passed between different windows?**
**Answer:** Data is passed via constructor arguments. For example, when `LoginWindow` opens `FoodApp`, it passes the `user_info` dictionary and the active `Database` instance. When `FoodApp` opens `BillingSystem`, it passes the `cart_items` list, `total_amount`, and the `user_id`.

**Q6: What does `bind` do in Tkinter?**
**Answer:** The `.bind()` method ties an event to a function. For example, `self.tree_orders.bind("<<TreeviewSelect>>", self.on_order_select)` ensures that when a user clicks a row in the Order History table, the `on_order_select` method is automatically called to load that order's details.

**Q7: How is the password stored securely?**
**Answer:** The password is not stored in plain text. It is hashed using the `hashlib.sha256()` algorithm before saving it to the `users` table. During login, the entered password is hashed again and compared to the database hash.
