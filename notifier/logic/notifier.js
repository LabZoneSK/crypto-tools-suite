const _ = require('underscore');
const email = require('../notifications/email');
const store = require('../utils/store');
const kraken = require('../exchanges/kraken');


/*
let ordersMemory = [
  'OGTYC7-N6TIG-RCKKC3',
  'OENI5Y-VA6NJ-QSWMHE',
  'OEVS3C-RSF2P-NKZX5D',
  'O6A4DK-UQAVQ-YVDEQY',
  'O6A4DK-AAAAA-YVDEQY'
]; */
let ordersMemory = [];

const run = () => {
  /*getClosedOrderInformation('OQG2IX-RDETS-HHDUT2');*/
  kraken.getOpenOrders()
    .then((orders) => {
      if (orders.result.open) {
        const ordersMemory = store.readStore().openOrders || [];

        const openOrders = Object.keys(orders.result.open);
        const closedOrders = _.difference(ordersMemory, openOrders);
        //TODO: Handle difference order if exists
        if (closedOrders.length > 0) {
          console.log('There is closed order(s).');
          console.log(closedOrders);
          closedOrders.map(closedOrder => {
            console.log(closedOrder);
            getClosedOrderInformation(closedOrder);
          });
          //getClosedOrderInformation('OGTYC7-N6TIG-RCKKC3');
        }
        //TODO: Load orders to memory
        store.updateStore({
          'openOrders': openOrders,
        });

        console.log('Open orders stored in memory');
        console.log(ordersMemory);
        setTimeout(run, 1000 * 60 * 15); //TODO> Set tick in .env
      }
    })
    .catch((error) => {
      if (error.statusCode === 504 || error.statusCode === 520) {
        console.log(`Error ${error.statusCode} getting order information. Will try again after 5 seconds.`)
        setTimeout(() => {
          run();
        }, 5000);
      }
    });
};

const getClosedOrderInformation = (txid) => {
  kraken.queryOrders(txid)
    .then((information) => {
      if (information) {
        console.log(information);
        for (let key in information) {
          if (information.hasOwnProperty(key)) {
            console.log('Sending information.');
            const orderInformation = information[key];
            email.sendEmail({
              to: process.env.OwnerEmail,
              subject: 'Notifier: Your order has been closed',
              html: `<p>Your open order has been closed:</p>
               <p>
              Symbol:${orderInformation.descr.pair}<br/>
              Amount:${orderInformation.vol_exec}<br/>
              Price:${orderInformation.descr.price}<br/>
              </p>`,
            });
          }
        };
      }
    })
    .catch((error) => {
      if (error.statusCode === 504 || error.statusCode === 520) {
        console.log(`Error ${error.statusCode} getting order information. Will try again after 5 seconds.`)
        setTimeout(() => {
          getClosedOrderInformation(txid);
        }, 5000);
      }
    });
}
module.exports = {
  run,
};
