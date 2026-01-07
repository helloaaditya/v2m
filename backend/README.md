# V2 Marketing Backend API

Backend server for the V2 Marketing Admin Panel.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file (optional):
```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username and password
- `GET /api/auth/verify` - Verify JWT token

### Inventory
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item
- `POST /api/inventory/:id/stock` - Stock in/out operation

### Activity History
- `GET /api/activities` - Get activity history

## Default Credentials

- Username: `admin`
- Password: `admin123`

**Note:** Change the default password in production!

## Data Storage

Data is stored in JSON files in the `data/` directory:
- `inventory.json` - Inventory items
- `activityHistory.json` - Activity logs
- `users.json` - User accounts

