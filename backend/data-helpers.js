import { getCollection, isMongoConnected } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
const inventoryFile = path.join(dataDir, 'inventory.json');
const activityFile = path.join(dataDir, 'activityHistory.json');
const usersFile = path.join(dataDir, 'users.json');
const productsFile = path.join(dataDir, 'products.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data files if they don't exist
export const initializeDataFiles = () => {
  if (!fs.existsSync(inventoryFile)) {
    fs.writeFileSync(inventoryFile, JSON.stringify([]));
  }
  if (!fs.existsSync(activityFile)) {
    fs.writeFileSync(activityFile, JSON.stringify([]));
  }
  if (!fs.existsSync(usersFile)) {
    // Create default admin user
    const defaultUser = {
      id: '1',
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
      createdAt: new Date().toISOString()
    };
    fs.writeFileSync(usersFile, JSON.stringify([defaultUser]));
  }
  if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, JSON.stringify([]));
  }
};

// ============ INVENTORY HELPERS ============
export const readInventory = async () => {
  if (isMongoConnected()) {
    try {
      const collection = getCollection('inventory');
      const items = await collection.find({}).toArray();
      return items;
    } catch (error) {
      console.error('MongoDB read error, falling back to files:', error);
      return readInventoryFile();
    }
  }
  return readInventoryFile();
};

const readInventoryFile = () => {
  try {
    if (!fs.existsSync(inventoryFile)) return [];
    const data = fs.readFileSync(inventoryFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeInventory = async (data) => {
  if (isMongoConnected()) {
    try {
      const collection = getCollection('inventory');
      // Clear and insert all items
      await collection.deleteMany({});
      if (data.length > 0) {
        await collection.insertMany(data);
      }
      return;
    } catch (error) {
      console.error('MongoDB write error, falling back to files:', error);
      writeInventoryFile(data);
    }
  } else {
    writeInventoryFile(data);
  }
};

const writeInventoryFile = (data) => {
  fs.writeFileSync(inventoryFile, JSON.stringify(data, null, 2));
};

// ============ ACTIVITIES HELPERS ============
export const readActivities = async () => {
  if (isMongoConnected()) {
    try {
      const collection = getCollection('activities');
      const activities = await collection.find({}).sort({ timestamp: -1 }).limit(1000).toArray();
      return activities;
    } catch (error) {
      console.error('MongoDB read error, falling back to files:', error);
      return readActivitiesFile();
    }
  }
  return readActivitiesFile();
};

const readActivitiesFile = () => {
  try {
    if (!fs.existsSync(activityFile)) return [];
    const data = fs.readFileSync(activityFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeActivities = async (data) => {
  // Keep only last 1000 activities
  const limited = data.slice(0, 1000);
  
  if (isMongoConnected()) {
    try {
      const collection = getCollection('activities');
      // Clear and insert all activities
      await collection.deleteMany({});
      if (limited.length > 0) {
        await collection.insertMany(limited);
      }
      return;
    } catch (error) {
      console.error('MongoDB write error, falling back to files:', error);
      writeActivitiesFile(limited);
    }
  } else {
    writeActivitiesFile(limited);
  }
};

const writeActivitiesFile = (data) => {
  fs.writeFileSync(activityFile, JSON.stringify(data, null, 2));
};

// ============ USERS HELPERS ============
export const readUsers = async () => {
  if (isMongoConnected()) {
    try {
      const collection = getCollection('users');
      const users = await collection.find({}).toArray();
      return users;
    } catch (error) {
      console.error('MongoDB read error, falling back to files:', error);
      return readUsersFile();
    }
  }
  return readUsersFile();
};

const readUsersFile = () => {
  try {
    if (!fs.existsSync(usersFile)) return [];
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// ============ PRODUCTS HELPERS ============
export const readProducts = async () => {
  if (isMongoConnected()) {
    try {
      const collection = getCollection('products');
      const products = await collection.find({}).toArray();
      return products;
    } catch (error) {
      console.error('MongoDB read error, falling back to files:', error);
      return readProductsFile();
    }
  }
  return readProductsFile();
};

const readProductsFile = () => {
  try {
    if (!fs.existsSync(productsFile)) return [];
    const data = fs.readFileSync(productsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeProducts = async (data) => {
  if (isMongoConnected()) {
    try {
      const collection = getCollection('products');
      // Clear and insert all products
      await collection.deleteMany({});
      if (data.length > 0) {
        await collection.insertMany(data);
      }
      return;
    } catch (error) {
      console.error('MongoDB write error, falling back to files:', error);
      writeProductsFile(data);
    }
  } else {
    writeProductsFile(data);
  }
};

const writeProductsFile = (data) => {
  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2));
};

