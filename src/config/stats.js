// Dynamic Stats Configuration
// Update these values to change stats across the entire website

export const stats = {
  yearsExperience: 30,
  projectsCompleted: 500,
  genuineProducts: 100,
  supportHours: '24/7'
};

// Helper function to format stats
export const formatStat = (key) => {
  switch (key) {
    case 'yearsExperience':
      return `${stats.yearsExperience}+`;
    case 'projectsCompleted':
      return `${stats.projectsCompleted}+`;
    case 'genuineProducts':
      return `${stats.genuineProducts}%`;
    case 'supportHours':
      return stats.supportHours;
    default:
      return '';
  }
};
