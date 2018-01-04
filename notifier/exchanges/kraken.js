const KrakenClient = require('kraken-api');

const kraken = new KrakenClient(process.env.APIKey, process.env.APISign, {
  timeout: process.env.Timeout || 50000,
});

const getBalance = () => {
  return new Promise((resolve, reject) => {
    kraken.api('Balance', null, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });
  });
};

const getOpenOrders = () => {
  return new Promise((resolve, reject) => {
    kraken.api('OpenOrders', null, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    })
  });
}

const placeOrder = (pair, type, ordertype, price, volume) => {
  return new Promise((resolve, reject) => {
    const options = {
      pair,
      type,
      ordertype,
      price,
      volume,
    }
    kraken.api('AddOrder', options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });
  });
};

const queryOrders = (txid) => {
  return new Promise((resolve, reject) => {
    const options = {
      txid
    }
    kraken.api('QueryOrders', options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });
  });
}

module.exports = {
  getBalance,
  getOpenOrders,
  placeOrder,
  queryOrders,
};
