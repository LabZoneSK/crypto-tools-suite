const fs = require('fs');
const path = require('path');

const appDir = path.dirname(require.main.filename);
const DATA_FILE = appDir + path.sep + 'data.json';

const updateStore = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const readStore = () => {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE));
  } else {
    return {};
  }

}

module.exports = {
  updateStore,
  readStore,
};
