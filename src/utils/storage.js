// Utility functions for localStorage operations

export const getInventory = () => {
  try {
    const data = localStorage.getItem('inventory');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading inventory:', error);
    return [];
  }
};

export const saveInventory = (inventory) => {
  try {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    return true;
  } catch (error) {
    console.error('Error saving inventory:', error);
    return false;
  }
};

export const getActivityHistory = () => {
  try {
    const data = localStorage.getItem('activityHistory');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading activity history:', error);
    return [];
  }
};

export const saveActivityHistory = (activities) => {
  try {
    localStorage.setItem('activityHistory', JSON.stringify(activities));
    return true;
  } catch (error) {
    console.error('Error saving activity history:', error);
    return false;
  }
};

export const addActivity = (activity) => {
  const activities = getActivityHistory();
  const newActivity = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...activity
  };
  activities.unshift(newActivity); // Add to beginning
  // Keep only last 1000 activities
  const limitedActivities = activities.slice(0, 1000);
  saveActivityHistory(limitedActivities);
  return newActivity;
};

