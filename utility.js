const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const filePath = path.join(__dirname, 'data.json');
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};
