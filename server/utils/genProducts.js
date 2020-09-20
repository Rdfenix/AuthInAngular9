const mongoose = require('mongoose');
const faker = require('faker');
const ProductModel = require('../models/ProductModel');

mongoose.connect(
  'mongodb+srv://rdfenix:@Aiolos92@rudfenix.huk8u.mongodb.net/RudFenix?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function add(n) {
  try {
    for (let i = 0; i < n; i++) {
      const prod = new ProductModel();
      prod.name = faker.commerce.productName();
      prod.department = faker.commerce.department();
      prod.price = faker.commerce.price();
      await prod.save();
    }
  } catch (error) {
    console.log(error);
  }
}

add(100).then(() => {
  console.log('OK');
  mongoose.disconnect();
});
