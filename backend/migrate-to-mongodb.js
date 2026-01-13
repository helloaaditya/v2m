import 'dotenv/config';
import { connectDB, getCollection, isMongoConnected } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');
const inventoryFile = path.join(dataDir, 'inventory.json');
const activityFile = path.join(dataDir, 'activityHistory.json');
const productsFile = path.join(dataDir, 'products.json');

// Read JSON files
const readJSONFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

// Migrate data to MongoDB
const migrateData = async () => {
  console.log('🔄 Starting migration to MongoDB...\n');

  // Check if MongoDB is connected
  if (!isMongoConnected()) {
    console.log('❌ MongoDB not connected. Please set MONGODB_URI environment variable.');
    console.log('   Run: export MONGODB_URI="your-connection-string"');
    process.exit(1);
  }

  try {
    // Migrate Inventory
    console.log('📦 Migrating inventory...');
    const inventory = readJSONFile(inventoryFile);
    if (inventory.length > 0) {
      const inventoryCollection = getCollection('inventory');
      const existingCount = await inventoryCollection.countDocuments();
      
      if (existingCount === 0) {
        await inventoryCollection.insertMany(inventory);
        console.log(`   ✅ Migrated ${inventory.length} inventory items`);
      } else {
        console.log(`   ⏭️  Inventory collection already has ${existingCount} items, skipping...`);
      }
    } else {
      console.log('   ℹ️  No inventory data to migrate');
      // Initialize empty collection
      const inventoryCollection = getCollection('inventory');
      await inventoryCollection.insertOne({ _temp: true });
      await inventoryCollection.deleteOne({ _temp: true });
      console.log('   ✅ Initialized empty inventory collection');
    }

    // Migrate Activities
    console.log('\n📋 Migrating activities...');
    const activities = readJSONFile(activityFile);
    if (activities.length > 0) {
      const activitiesCollection = getCollection('activities');
      const existingCount = await activitiesCollection.countDocuments();
      
      if (existingCount === 0) {
        await activitiesCollection.insertMany(activities);
        console.log(`   ✅ Migrated ${activities.length} activities`);
      } else {
        console.log(`   ⏭️  Activities collection already has ${existingCount} items, skipping...`);
      }
    } else {
      console.log('   ℹ️  No activities data to migrate');
      // Initialize empty collection
      const activitiesCollection = getCollection('activities');
      await activitiesCollection.insertOne({ _temp: true });
      await activitiesCollection.deleteOne({ _temp: true });
      console.log('   ✅ Initialized empty activities collection');
    }

    // Migrate Products
    console.log('\n🛍️  Migrating products...');
    const products = readJSONFile(productsFile);
    if (products.length > 0) {
      const productsCollection = getCollection('products');
      const existingCount = await productsCollection.countDocuments();
      
      if (existingCount === 0) {
        await productsCollection.insertMany(products);
        console.log(`   ✅ Migrated ${products.length} products`);
      } else {
        console.log(`   ⏭️  Products collection already has ${existingCount} items, skipping...`);
      }
    } else {
      console.log('   ℹ️  No products data to migrate');
      // Initialize empty collection
      const productsCollection = getCollection('products');
      await productsCollection.insertOne({ _temp: true });
      await productsCollection.deleteOne({ _temp: true });
      console.log('   ✅ Initialized empty products collection');
    }

    // Verify collections
    console.log('\n📊 Collection Status:');
    const inventoryCollection = getCollection('inventory');
    const activitiesCollection = getCollection('activities');
    const productsCollection = getCollection('products');
    const usersCollection = getCollection('users');

    const inventoryCount = await inventoryCollection.countDocuments();
    const activitiesCount = await activitiesCollection.countDocuments();
    const productsCount = await productsCollection.countDocuments();
    const usersCount = await usersCollection.countDocuments();

    console.log(`   📦 inventory: ${inventoryCount} documents`);
    console.log(`   📋 activities: ${activitiesCount} documents`);
    console.log(`   🛍️  products: ${productsCount} documents`);
    console.log(`   👥 users: ${usersCount} documents`);

    console.log('\n✅ Migration completed successfully!');
    console.log('   All collections are now initialized in MongoDB.');

  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
};

// Run migration
const runMigration = async () => {
  const connected = await connectDB();
  if (connected) {
    await migrateData();
    process.exit(0);
  } else {
    console.error('❌ Failed to connect to MongoDB');
    process.exit(1);
  }
};

runMigration();

