const express = require('express');
const getSalesRecords = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/salesRecords', function (req, res) {

  return getSalesRecords.getSalesRecords((err, results) => {
    if (err) {
      console.log(err);
    } else {
      
      let trendingItems = {}

      for (var i = 0; i < results.length; i++) {
        if (`${results[i].Restaurant}_${results[i].ItemName}` in trendingItems) {
          trendingItems[`${results[i].Restaurant}_${results[i].ItemName}`]["Quantity"] += results[i]["Quantity"]
          if (trendingItems[`${results[i].Restaurant}_${results[i].ItemName}`].OrderID < results[i].OrderID) {
            trendingItems[`${results[i].Restaurant}_${results[i].ItemName}`].OrderID = results[i].OrderID
          }
        } else {
          trendingItems[`${results[i].Restaurant}_${results[i].ItemName}`] = {"OrderID" : results[i].OrderID, "Restaurant" : results[i].Restaurant, "ItemName" : results[i].ItemName, "Quantity" : results[i].Quantity, "ProductPrice" : results[i].ProductPrice }
        } 
      }

      let trendingList = []
      let trendingList2 = []

      for (const restaurantProduct in trendingItems) {
        trendingList.push(trendingItems[restaurantProduct])
        trendingList2.push(trendingItems[restaurantProduct])
      }

      let sortedByRecency = trendingList.sort((a, b) => {
        return b.OrderID - a.OrderID
      })

      let sortedbyQuantityBought = trendingList2.sort((a, b) => {
        return b.Quantity - a.Quantity
      })

      res.send([sortedByRecency, sortedbyQuantityBought])
    }
  })
});

let port = 8080;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
