const _ = require('underscore');

const kraken = require('../exchanges/kraken');

const test = ['OWZ5PN-K6GAA-4CAWD6',
  'OCLLM7-2TSZH-JYGL4P',
  'OJBAWF-T6GIB-QTM6ME',
  'OFLAGM-JTYUM-TV7BJE',
  'OTQEM6-54YFV-XLN7WL',
  'O6PEND-AHT76-DQQF4X',
  'OQG2IX-RDETS-HHDUT2',
  'AAAAAA-BBBBB-CCCCCC'
];

const run = () => {
  getClosedOrderInformation('OQG2IX-RDETS-HHDUT2');
  /*
    kraken.getOpenOrders()
      .then((orders) => {
        if (orders.result.open) {
          const closed = _.difference(test, Object.keys(orders.result.open));

          console.log(closed);
        }
      })
      .catch(error => console.log(error));
      */
};

const getClosedOrderInformation = (txid) => {
  kraken.queryOrders(txid)
    .then((information) => {
      if (information) {
        console.log(information);
      }
    })
    .catch(error => console.log(error));
}
module.exports = {
  run,
};
