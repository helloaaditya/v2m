# Quick Start - Backend Setup

## Starting the Backend Server

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **The backend will run on:** `http://localhost:5000`

## Starting the Frontend

1. **In a new terminal, navigate to the project root:**
   ```bash
   cd ..
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```

3. **The frontend will run on:** `http://localhost:3000` (or the port shown in terminal)

## Default Credentials

- **Username:** `admin`
- **Password:** `admin123`

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item
- `POST /api/inventory/:id/stock` - Stock in/out
- `GET /api/activities` - Get activity history

## Data Storage

All data is stored in JSON files in the `backend/data/` directory:
- `inventory.json` - Inventory items
- `activityHistory.json` - Activity logs
- `users.json` - User accounts

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check that all dependencies are installed: `npm install`

### Frontend can't connect to backend
- Make sure the backend is running on port 5000
- Check the browser console for CORS errors
- Verify the API URL in `src/utils/api.js` (default: `http://localhost:5000/api`)

### Login fails
- Make sure the backend server is running
- Check browser console for errors
- Verify credentials: `admin` / `admin123`

