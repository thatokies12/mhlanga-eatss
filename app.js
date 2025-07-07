const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const driverRoutes = require('./routes/driver.routes');
const storeRoutes = require('./routes/store.routes');
const productRoutes = require('./routes/product.routes');
const customerRoutes = require('./routes/customer.routes');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/manager', storeRoutes);
app.use('/api/product', productRoutes);
app.use('/api/customer', customerRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));