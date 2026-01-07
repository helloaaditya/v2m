import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || 'v2marketing';

let client = null;
let db = null;

// Connect to MongoDB
export const connectDB = async () => {
  if (!MONGODB_URI) {
    console.log('⚠️  MONGODB_URI not set. Using file-based storage (data will be lost on restart).');
    return false;
  }

  try {
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
      db = client.db(DB_NAME);
      console.log('✅ Connected to MongoDB');
      
      // Initialize default admin user if users collection is empty
      await initializeDefaultUser();
    }
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
};

// Initialize default admin user
const initializeDefaultUser = async () => {
  try {
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    
    if (userCount === 0) {
      const defaultUser = {
        id: '1',
        username: 'admin',
        password: bcrypt.hashSync('admin123', 10),
        createdAt: new Date().toISOString()
      };
      await usersCollection.insertOne(defaultUser);
      console.log('✅ Default admin user created (username: admin, password: admin123)');
    }
  } catch (error) {
    console.error('Error initializing default user:', error);
  }
};

// Get database instance
export const getDB = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
};

// Check if MongoDB is connected
export const isMongoConnected = () => {
  return db !== null && client !== null;
};

// Close connection
export const closeDB = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
};

// Collection helpers
export const getCollection = (collectionName) => {
  return getDB().collection(collectionName);
};

