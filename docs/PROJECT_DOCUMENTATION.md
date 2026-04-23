# Online Food Delivery System - Comprehensive Project Documentation

## 1. Academic Details
- **Subject Code:** PRP230807
- **Subject Name:** Programming in Python
- **Topic:** Online Food Delivery System

## 2. Team Members
- **B002** (Rudra Babar)
- **B010** (Aryan Desale)
- **B030** (Shishir Bhavsar)

---

## 3. Abstract
The **Online Food Delivery System (FoodHub)** is an interactive, full-stack web application developed using the Python Flask framework and SQLite database. Designed with a real-world e-commerce approach, the application bridges the gap between hungry customers and restaurant administration. It provides a highly responsive UI where users can securely register, explore dynamic menus with sophisticated filters, add items to a real-time shopping cart, and seamlessly checkout while managing their delivery addresses. The system also introduces robust features like order history tracking and an interactive review system. On the administrative side, the platform offers a powerful control dashboard allowing total database manipulation—from menu changes to careful review moderation, providing an enterprise-like administrative experience.

---

## 4. Problem Statement
Traditional food ordering via telephone calls or physical menus is inefficient, prone to human error, and lacks transparency. Customers often struggle to see accurate pricing, visualize the food, or track order progress. Businesses lack centralized systems to effectively manage massive catalogs and parse customer feedback. There is a strong need for an accessible, digitized platform where the entire lifecycle of food ordering—from browsing to eating—is tracked, intuitive, and error-free.

---

## 5. Objectives
- **End-to-End Application:** Develop a cohesive full-stack web application demonstrating the interplay between backend processing and frontend UI.
- **Security:** Implement secure authentication pipelines including salted hash algorithms for user passwords.
- **Real-Time Experience:** Build a dynamic cart and checkout flow ensuring persistent state across the user session.
- **Administrative Control:** Provide role-based access control (RBAC), ensuring sensitive dashboard operations remain exclusively in the hands of authorized administrators.
- **Responsive Architecture:** Leverage Bootstrap 5 and flexbox/CSS grid to ensure the layout is perfect across mobile, tablet, and desktop viewports.

---

## 6. Technology Stack Details
### Backend Operations
- **Python (3.x):** Chosen for its readability, robust standard libraries, and excellent integration with web frameworks.
- **Flask Framework:** Utilized for its micro-architecture, providing routing, session management, and template rendering without unnecessary bloat.
- **SQLite3 Database:** A lightweight, serverless relational database embedded into the application environment. Ideal for this academic scope.
- **Werkzeug:** Supplies critical security functions like `generate_password_hash` and `check_password_hash`.

### Frontend & UI
- **HTML5 & CSS3:** Semantic markup coupled with highly customized stylesheets that prioritize modern design aesthetics.
- **JavaScript (Vanilla):** Powers all asynchronous client-side interactions, such as "Add to Cart" triggers, modal popups, without requiring full page reloading.
- **Bootstrap 5:** Facilitates grid structuring, typography, standard components, and immediate responsiveness.

---

## 7. Deep-Dive Module Overview

### A. Authentication Module
Handles the creation of accounts and valid entry into the system. Differentiates regular 'customer' roles from 'admin' roles. Employs security via Flask's secure session cookies.

### B. Menu & Browsing Module
Connects the UI to the SQLite database to fetch `menu_items`. Allows clients to apply query strings (`?q=pizza`) and filters (category, veg/non-veg, price range) directly to SQL clauses seamlessly.

### C. Cart Operations Module
Utilizes the Flask session dictionary (`session['cart']`) to maintain temporary cart state. Calculates dynamic subtotals, handles quantity increment/decrements, and clears the staging area upon checkout.

### D. Checkout & Order Generation Module
The most critical transactional workflow. It transforms session carts into immutable rows in the `orders` and `order_items` tables. Integrates an address manager so users can save frequently used delivery locations.

### E. Post-Order & Feedback Module
Fetches temporal data allowing users to review their ordering history. Introduces a two-tier review system (overall order rating + distinct food item rating).

### F. Admin Dashboard Module
Restricted interfaces utilizing an `@admin_required` decorator. Surfaces complex operations allowing admins to add/edit/delete food records and review pending user moderations.

---

## 8. Database Schema Design 
The core relational layout ensuring data integrity:
- **`users`**: Contains `id`, `username`, `password` (hashed), and `role`.
- **`menu_items`**: Houses catalog data including `name`, `price`, `is_veg`, `image_path`, and `category`.
- **`orders`**: Header table tracking the user, total amount, delivery details, and status.
- **`order_items`**: Line items resolving the Many-to-Many relationship between orders and menu details.
- **`addresses`**: Allows relation between users and saved destinations.
- **`order_reviews` / `item_reviews`**: Tables pending admin approval before influencing public ratings.

*(Full schema definitions available in `schema.sql` and initialized via `setup_db.py`)*

---

## 9. Visual Interface Tour
To understand the application layout, refer to the following documented screenshots:

### Home & Menu Exploration
- **Menu Overview:** `screenshots/online-food-delivery-screenshot-02.png` 
- **Filtering System:** `screenshots/online-food-delivery-screenshot-03.png`

### Customer Checkout Flow
- **Active Cart Checkout:** `screenshots/online-food-delivery-screenshot-05.png`
- **Delivery Configuration:** `screenshots/online-food-delivery-screenshot-06.png` & `07.png`
- **Successful Order Interaction:** `screenshots/online-food-delivery-screenshot-08.png`

### Post-Purchase Evaluation
- **History Log:** `screenshots/online-food-delivery-screenshot-01.png`
- **Rating interface:** `screenshots/online-food-delivery-screenshot-09.png`

### Admin Management Operations
- **Food Directory UI:** `screenshots/online-food-delivery-screenshot-10.png`
- **Moderation Terminal:** `screenshots/online-food-delivery-screenshot-11.png`
- **CRUD Addition Form:** `screenshots/online-food-delivery-screenshot-12.png`

### High-Fidelity Video Walkthrough
We have recorded a runtime visual walkthrough of the system.
**Location:** [docs/video/demo.mp4](video/demo.mp4)

---

## 10. Execution Instructions
1. Install requirements: `pip install -r requirements.txt`
2. Initialize and structure DB: `python setup_db.py`
3. Mount the Flask backend: `python app.py`
4. Access client via standard browser at: `http://127.0.0.1:5000`

---

## 11. Testing & Validation
All systems checked:
- [x] Account registration sanitizes poorly formatted inputs.
- [x] Passwords are encrypted before database insertion.
- [x] Admin routes correctly block unauthorized standard users (403 Forbidden).
- [x] Shopping cart validates quantities and blocks negative totals.
- [x] Checkouts correctly calculate combined item prices and reflect them accurately in SQL.
- [x] Application scales down beautifully to mobile dimensions without overflow clipping.

---

## 12. Future Scope
- Integration with third-party payment gateways (e.g., Stripe, Razorpay) to simulate real financial transactions.
- WebSockets for a live-updating restaurant preparation tracker.
- Automated email confirmations via SMTP upon order checkout.
- Migration from SQLite to PostgreSQL for massive scale multi-threading support.

---

## 13. Conclusion
The FoodHub project successfully merges modern UI design with robust RESTful backend architecture. It satisfies the academic constraints while pushing far beyond by implementing production-adjacent features (like modular architectures, RBAC, and relational integrity). It represents a comprehensive understanding of the Python web development ecosystem.
