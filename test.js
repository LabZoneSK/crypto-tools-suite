const store = require('./utils/store');

store.updateStore({
  'openOrders': [
    'AAA-AAA',
  ]
});

console.log(store.readStore());
