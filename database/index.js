const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/SaleRecords', { useNewUrlParser: true, useUnifiedTopology: true });

let salesRecordSchema = mongoose.Schema({
    OrderID: String,
    Restaurant: String,
    ItemName: String,
    Quantity: Number,
    ProductPrice: String,
    TotalProducts: Number,

});

const SalesRecord = mongoose.model('SalesRecord', salesRecordSchema)

const saveSalesRecords = (data) => {
    data.save((err, record) => {
        if (err) {
            return (err, null);
        }
        return (null, record);
    });
}

const getSalesRecords = (callback) => {
    SalesRecord.find({}, (err, results) => {
        if (err) {
          callback(err);
        } else {
        callback(err, results);
        }
      })
}


module.exports = {
    SalesRecord,
    saveSalesRecords,
    getSalesRecords,
  };
  