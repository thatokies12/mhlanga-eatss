
# Mhlanga Eatss 🛵

**Mhlanga Eats** is a web-based delivery platform built to serve the KwaMhlanga community, connecting customers with local food and grocery vendors. The platform allows users to browse stores, place orders, track deliveries, and manage operations with multiple user roles.

> 🚧 Parcel and Document delivery coming soon!

---

## 📦 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Payment Integration:** (TBD - Stripe or Paystack)
- **Live Tracking:** (TBD - Google Maps API)

---

## 🚀 Features

### 👥 Users
- Register & login (Email or Phone)
- Browse food & grocery stores
- Add to cart & place orders
- Online payments
- Live delivery tracking
- Order history & notifications

### 🏪 Store Managers
- Secure login
- Add/update products or menus
- Accept or reject orders
- View sales reports

### 🛵 Drivers
- View available deliveries
- Accept & manage delivery jobs
- Mark orders as delivered

### ⚙️ Admin
- Manage all users, stores, and deliveries
- View analytics and reports
- Handle support and disputes

---

## 🧱 Project Structure

```

kwamhlanga-eats/
├── client/           # Frontend files
├── server/           # Backend (Node.js + Express)
│   ├── config/       # MySQL DB config
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
├── .env              # Environment variables
├── README.md
├── package.json

````

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/kwamhlanga-eats.git
cd kwamhlanga-eats
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root and configure:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=kwamhlanga_eats
JWT_SECRET=your_jwt_secret
```

### 4. Create MySQL database

```sql
CREATE DATABASE kwamhlanga_eats;
```

### 5. Run the server

```bash
npm run dev
```

---

## 📌 Coming Soon

* Document & parcel delivery
* Ratings & reviews
* Mobile app version
* Store-specific promotions
* Push notifications

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature/your-feature`
6. Submit a pull request

---

## 📧 Contact

For questions or contributions, email us at **[info@kwamhlangaeats.co.za](mailto:info@kwamhlangaeats.co.za)** (placeholder)

---

## 📝 License

This project is licensed under the MIT License.

```


