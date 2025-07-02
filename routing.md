Of course. Based on the provided API endpoint design and database schema, here is a complete, well-structured Node.js/Express.js REST API using the MVC (Model-View-Controller) pattern.

This structure is robust, scalable, and separates concerns, making it easy to maintain and extend.

### **Project Structure**

First, let's define the file and folder structure. This layout clearly separates the different parts of the application.

```
kwamhlanga-eats-api/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── customer.controller.js
│   │   │   ├── storeManager.controller.js
│   │   │   ├── driver.controller.js
│   │   │   └── admin.controller.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── store.model.js
│   │   │   ├── product.model.js
│   │   │   ├── cart.model.js
│   │   │   ├── order.model.js
│   │   │   └── delivery.model.js
│   │   ├── routes/
│   │   │   ├── index.js             # Main router to combine all other routes
│   │   │   ├── auth.routes.js
│   │   │   ├── customer.routes.js
│   │   │   ├── storeManager.routes.js
│   │   │   ├── driver.routes.js
│   │   │   └── admin.routes.js
│   │   └── middleware/
│   │       ├── auth.middleware.js   # JWT token validation
│   │       └── authorize.middleware.js # Role-based access control
│   ├── config/
│   │   └── db.config.js             # Database connection
│   └── utils/
│       ├── generateToken.js
│       └── errorHandler.js          # (Optional but recommended)
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js                      # Application entry point
```

---

### **Step 1: Setup and Dependencies**

Create a `package.json` file by running `npm init -y`. Then, install the necessary dependencies:

```bash
# Core dependencies
npm install express mysql2 dotenv jsonwebtoken bcryptjs cors

# Development dependencies
npm install -D nodemon
```

Now, update your `package.json` scripts:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

### **Step 2: Environment Variables**

Create a `.env.example` file to show what's needed:

**`.env.example`**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kwamhlanga_eats
JWT_SECRET=a_very_strong_and_long_secret_key
```

Create your own `.env` file and fill in your actual database credentials.

---

### **Step 3: Server and Database Configuration**

**`server.js` (Entry Point)**
```javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const apiRoutes = require('./src/api/routes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Simple health check route
app.get('/', (req, res) => {
  res.send('KWAMHLANGA-EATS API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**`src/config/db.config.js`**
```javascript
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.stack);
  });

module.exports = pool;
```

---

### **Step 4: Authentication & Authorization Middleware**

**`src/utils/generateToken.js`**
```javascript
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
```

**`src/api/middleware/auth.middleware.js`**
```javascript
const jwt = require('jsonwebtoken');
const pool = require('../../config/db.config');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (without the password)
      const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id]);
      
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = rows[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
```

**`src/api/middleware/authorize.middleware.js`**
```javascript
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Forbidden: Access denied for role '${req.user.role}'` });
    }
    next();
  };
};

module.exports = { authorize };
```

---

### **Step 5: Models (Data Layer)**

Here is an example for the `user.model.js`. You would create similar files for `store`, `product`, `order`, etc., containing the SQL queries for each entity.

**`src/api/models/user.model.js`**
```javascript
const pool = require('../../config/db.config');
const bcrypt = require('bcryptjs');

const User = {};

User.create = async (newUser) => {
  const { name, email, password, phone, role } = newUser;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashedPassword, phone, role]
  );
  return { id: result.insertId, ...newUser };
};

User.findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

User.findById = async (id) => {
    // Exclude password from the result for security
    const [rows] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
};

// ... add other functions like update, delete, findAll as needed for the admin panel

module.exports = User;
```

---

### **Step 6: Controllers (Business Logic)**

Each controller handles the logic for a specific set of routes. **Note:** The following code provides the structure. You would fill in the `// TODO: Implement logic` sections using your models.

**`src/api/controllers/auth.controller.js`**
```javascript
const User = require('../models/user.model');
const generateToken = require('../../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/register
exports.registerUser = async (req, res) => {
  const { name, email, password, phone, role = 'customer' } = req.body;

  try {
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Default role is customer, only admin can create other roles
    const userRole = (req.user && req.user.role === 'admin') ? role : 'customer';

    const user = await User.create({ name, email, password, phone, role: userRole });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/profile
exports.getUserProfile = async (req, res) => {
    // req.user is populated by the 'protect' middleware
    const user = await User.findById(req.user.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
exports.updateUserProfile = async (req, res) => {
    // TODO: Implement logic to update user profile in the database
    res.json({ message: 'Profile updated successfully' });
};
```
*(You would create similar controller files like `customer.controller.js`, `admin.controller.js`, etc., with placeholder functions for each endpoint.)*

**Example `admin.controller.js`:**
```javascript
// @desc    List all users
// @route   GET /api/admin/users
exports.listAllUsers = async (req, res) => {
    // TODO: Implement logic to fetch all users from the User model
    res.json({ message: 'List of all users' });
};

// @desc    Update a user
// @route   PUT /api/admin/users/:id
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    // TODO: Implement logic to update a user by ID
    res.json({ message: `User ${userId} updated` });
};

// ... other admin controller functions
```

---

### **Step 7: Routes (URL to Controller Mapping)**

This is where you map the endpoints from your documentation to the controller functions, applying middleware where necessary.

**`src/api/routes/index.js` (Main Router)**
```javascript
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const customerRoutes = require('./customer.routes');
const storeManagerRoutes = require('./storeManager.routes');
const driverRoutes = require('./driver.routes');
const adminRoutes = require('./admin.routes');

// Use role-specific routers
router.use('/', authRoutes); // /register, /login, /profile
router.use('/', customerRoutes); // /stores, /cart, /orders
router.use('/manager', storeManagerRoutes); // /manager/products, /manager/orders
router.use('/driver', driverRoutes); // /driver/requests, /driver/tasks
router.use('/admin', adminRoutes); // /admin/users, /admin/stores

module.exports = router;
```

**`src/api/routes/auth.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
```

**`src/api/routes/admin.routes.js`**
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize.middleware');

// Import your admin controller functions here
// const { listAllUsers, updateUser, ... } = require('../controllers/admin.controller');

// All admin routes are protected and require 'admin' role
router.use(protect, authorize('admin'));

// User Management
router.get('/users', (req, res) => res.json({ message: 'Admin: List all users' })); // Placeholder
router.put('/users/:id', (req, res) => res.json({ message: `Admin: Update user ${req.params.id}` }));
router.delete('/users/:id', (req, res) => res.json({ message: `Admin: Delete user ${req.params.id}` }));

// Store Management
router.post('/stores', (req, res) => res.json({ message: 'Admin: Add a store' }));
router.put('/stores/:id', (req, res) => res.json({ message: `Admin: Edit store ${req.params.id}` }));
router.delete('/stores/:id', (req, res) => res.json({ message: `Admin: Remove store ${req.params.id}` }));

// Reports & Support
router.get('/reports', (req, res) => res.json({ message: 'Admin: View system-wide performance' }));
router.get('/support', (req, res) => res.json({ message: 'Admin: View support tickets' }));

module.exports = router;
```
*(Create similar route files for `customer`, `storeManager`, and `driver`, mapping each endpoint from your documentation to a controller function and protecting it where required.)*

---

### **Final Steps**

1.  **`.gitignore`**: Create a `.gitignore` file.
    ```
    node_modules
    .env
    ```
2.  **Database**: Make sure you have created the `kwamhlanga_eats` database and run the SQL scripts from your `CHANGELOG.md` to create the tables.
3.  **Run the Server**:
    ```bash
    # For development (with auto-reloading)
    npm run dev
    
    # For production
    npm start
    ```

You now have a fully structured, scalable, and secure base for your Kwamhlanga-Eats API, ready for you to implement the specific business logic inside each controller and model function.