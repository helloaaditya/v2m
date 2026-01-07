import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from './db.js';
import { 
  readInventory, writeInventory, 
  readActivities, writeActivities, 
  readUsers, readProducts, writeProducts,
  initializeDataFiles 
} from './data-helpers.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['https://v2m-rho.vercel.app', 'http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow if origin is in allowed list or if it's a localhost/development origin
    if (allowedOrigins.includes(origin) || 
        origin.includes('localhost') || 
        origin.includes('127.0.0.1') ||
        process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Initialize data files (for file-based fallback)
initializeDataFiles();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const users = await readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Inventory routes
app.get('/api/inventory', authenticateToken, async (req, res) => {
  try {
    const inventory = await readInventory();
    res.json(inventory);
  } catch (error) {
    console.error('Error reading inventory:', error);
    res.status(500).json({ error: 'Failed to read inventory' });
  }
});

app.post('/api/inventory', authenticateToken, async (req, res) => {
  try {
    const inventory = await readInventory();
    const newItem = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    inventory.push(newItem);
    await writeInventory(inventory);

    // Log activity
    const activities = await readActivities();
    activities.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'add',
      action: 'Item Added',
      itemName: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
      details: `Added ${newItem.quantity} ${newItem.unit} of ${newItem.name}`,
      userId: req.user.id,
      username: req.user.username
    });
    await writeActivities(activities);

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

app.put('/api/inventory/:id', authenticateToken, async (req, res) => {
  try {
    const inventory = await readInventory();
    const index = inventory.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const oldItem = { ...inventory[index] };
    const updatedItem = {
      ...inventory[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };
    inventory[index] = updatedItem;
    await writeInventory(inventory);

    // Log activity
    const activities = await readActivities();
    const quantityChange = updatedItem.quantity - oldItem.quantity;
    activities.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'update',
      action: 'Item Updated',
      itemName: updatedItem.name,
      oldQuantity: oldItem.quantity,
      newQuantity: updatedItem.quantity,
      quantityChange: quantityChange,
      unit: updatedItem.unit,
      details: quantityChange !== 0
        ? `Updated ${updatedItem.name}: ${oldItem.quantity} → ${updatedItem.quantity} ${updatedItem.unit} (${quantityChange > 0 ? '+' : ''}${quantityChange})`
        : `Updated ${updatedItem.name} details`,
      userId: req.user.id,
      username: req.user.username
    });
    await writeActivities(activities);

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

app.delete('/api/inventory/:id', authenticateToken, async (req, res) => {
  try {
    const inventory = await readInventory();
    const index = inventory.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const deletedItem = inventory[index];
    inventory.splice(index, 1);
    await writeInventory(inventory);

    // Log activity
    const activities = await readActivities();
    activities.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'delete',
      action: 'Item Deleted',
      itemName: deletedItem.name,
      details: `Item removed from inventory`,
      userId: req.user.id,
      username: req.user.username
    });
    await writeActivities(activities);

    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Stock In/Out
app.post('/api/inventory/:id/stock', authenticateToken, async (req, res) => {
  try {
    const { type, quantity, note, reference } = req.body; // type: 'in' or 'out'
    if (!type || !quantity || (type !== 'in' && type !== 'out')) {
      return res.status(400).json({ error: 'Invalid request. Type must be "in" or "out" and quantity is required' });
    }

    if (!note || note.trim() === '') {
      return res.status(400).json({ error: 'Note is required' });
    }

    const inventory = await readInventory();
    const index = inventory.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = inventory[index];
    const oldQuantity = item.quantity;
    const changeAmount = parseFloat(quantity);

    if (isNaN(changeAmount) || changeAmount <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    const newQuantity = type === 'in'
      ? item.quantity + changeAmount
      : Math.max(0, item.quantity - changeAmount);

    inventory[index] = {
      ...item,
      quantity: newQuantity,
      updatedAt: new Date().toISOString()
    };
    await writeInventory(inventory);

    // Log activity
    const activities = await readActivities();
    const activityDetails = `${type === 'in' ? 'Added' : 'Removed'} ${changeAmount} ${item.unit} of ${item.name}`;
    const fullDetails = reference 
      ? `${activityDetails}. Note: ${note}. Reference: ${reference}`
      : `${activityDetails}. Note: ${note}`;
    
    activities.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: type === 'in' ? 'stock_in' : 'stock_out',
      action: type === 'in' ? 'Stock In' : 'Stock Out',
      itemName: item.name,
      quantity: changeAmount,
      oldQuantity: oldQuantity,
      newQuantity: newQuantity,
      unit: item.unit,
      details: fullDetails,
      note: note.trim(),
      reference: reference ? reference.trim() : null,
      userId: req.user.id,
      username: req.user.username
    });
    await writeActivities(activities);

    res.json(inventory[index]);
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

// Activity history
app.get('/api/activities', authenticateToken, async (req, res) => {
  try {
    const activities = await readActivities();
    res.json(activities);
  } catch (error) {
    console.error('Error reading activities:', error);
    res.status(500).json({ error: 'Failed to read activities' });
  }
});

// Products routes (for website - public)
app.get('/api/products', async (req, res) => {
  try {
    const products = await readProducts();
    res.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to read products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error reading product:', error);
    res.status(500).json({ error: 'Failed to read product' });
  }
});

// Admin product management
app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const products = await readProducts();
    const newProduct = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    await writeProducts(products);

    // Log activity
    const activities = await readActivities();
    activities.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'add',
      action: 'Product Added',
      itemName: newProduct.name,
      details: `Added product: ${newProduct.name}`,
      userId: req.user.id,
      username: req.user.username
    });
    await writeActivities(activities);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const products = await readProducts();
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = {
      ...products[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };
    products[index] = updatedProduct;
    await writeProducts(products);

    // Log activity
    const activities = await readActivities();
    activities.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'update',
      action: 'Product Updated',
      itemName: updatedProduct.name,
      details: `Updated product: ${updatedProduct.name}`,
      userId: req.user.id,
      username: req.user.username
    });
    await writeActivities(activities);

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const products = await readProducts();
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deletedProduct = products[index];
    products.splice(index, 1);
    await writeProducts(products);

    // Log activity
    const activities = await readActivities();
    activities.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: 'delete',
      action: 'Product Deleted',
      itemName: deletedProduct.name,
      details: `Deleted product: ${deletedProduct.name}`,
      userId: req.user.id,
      username: req.user.username
    });
    await writeActivities(activities);

    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  
  // Try to connect to MongoDB
  await connectDB();
});

