const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readData = (collection) => {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) return [];
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
};

const saveData = (collection, item) => {
  const data = readData(collection);
  const newItem = { 
    ...item, 
    _id: item._id || 'local_' + Date.now() + Math.random().toString(36).substr(2, 5),
    date: item.date || new Date().toISOString() 
  };
  data.unshift(newItem); // Add to beginning
  fs.writeFileSync(getFilePath(collection), JSON.stringify(data.slice(0, 50), null, 2));
  return newItem;
};

module.exports = { readData, saveData };
