/**
 * Run this script with following command
 * NODE_PATH=./ npx ts-node --project tsconfig.build.json --transpile-only -r tsconfig-paths/register src/scripts/seed.ts
 */
import { connect } from 'mongoose';
import * as mongoose from 'mongoose';
import * as csv from 'fast-csv';
import * as path from 'path';
import * as fs from 'fs';

import config from '#config/config';
import { Order, OrderSchema } from '#trending/schemas/order.schema';
import * as moment from 'moment';

// File for testing just 1 order
// const DATA_FILE = 'orders-small.csv'

const DATA_FILE = 'orders.csv';

/**
 * Randomly generate timestamps
 * @param start Date
 * @param end Date
 * @returns Date
 */
const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

/**
 * Get all orders from csv processed rows
 * @returns Promise<Order[]>
 */
const getOrders = async (): Promise<Order[]> => {
  const twoDaysAgo = moment().subtract(2, 'days').toDate();
  const now = new Date();

  let csvProducts = [];
  let orders: Order[] = [];

  //Process each row from CSV and create an order record.
  const rows = await getRowsFromCSV();
  rows.forEach((row) => {
    if (!(row['Restaurant'] in csvProducts)) {
      //create a restaurant
      csvProducts[row['Restaurant']] = [];
    }
    if (!(row['Restaurant']['ItemName'] in csvProducts)) {
      //create a new product item
      const product = {
        name: row['ItemName'],
        price: parseFloat(row['ProductPrice']),
        quantity: parseInt(row['Quantity']),
      };
      csvProducts[row['Restaurant']][row['ItemName']] = product;
    }
    if (!(row['OrderID'] in orders)) {
      //console.log for debugging
      //console.log("processing new order: ", row['OrderID'])

      //create a new order with first product
      const price =
        parseFloat(csvProducts[row['Restaurant']][row['ItemName']].price) *
        parseFloat(csvProducts[row['Restaurant']][row['ItemName']].quantity);
      const order: Order = {
        orderId: parseInt(row['OrderID']),
        currency: 'USD',
        purchasedAt: getRandomDate(twoDaysAgo, now),
        products: [csvProducts[row['Restaurant']][row['ItemName']]],
        totalPrice: price,
      };
      orders[row['OrderID']] = order;
    } else {
      //console.log for debugging
      //console.log("processing existing order: ", row['OrderID'])
      const price =
        parseFloat(csvProducts[row['Restaurant']][row['ItemName']].price) *
        parseFloat(csvProducts[row['Restaurant']][row['ItemName']].quantity);

      //order exists. Add a product to it
      orders[row['OrderID']].products.push(
        csvProducts[row['Restaurant']][row['ItemName']],
      );
      orders[row['OrderID']].totalPrice += price;
    }
  });
  return orders;
};

/**
 * Get contents of CSV file
 * @returns Promise<any[]>
 */
const getRowsFromCSV = async (): Promise<any[]> => {
  let rows = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, 'data', DATA_FILE))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', (row) => rows.push(row))
      .on('end', (rowCount: number) => resolve(rows));
  });
};

//Since nest.js doesn't use model directly, this is
//a hack to seed script work properly
const OrderModel = mongoose.model('Orders', OrderSchema);

connect(config.MongoURI).then(async () => {
  console.log('Running Init DB!');
  console.log('Hang tight! This will take a few mins to complete...');
  try {
    const orders = await getOrders();
    await Promise.all(
      orders.map(async (order) => {
        await OrderModel.create(order);
        // console.log(`Creating order with id: ${order.orderId}`)
      }),
    );
    console.log('Init DB Successful. Processed orders count: ', orders.length);
    process.exit(0);
  } catch (err) {
    console.log('Init DB Failed with err: ', err);
    process.exit(1);
  }
});
