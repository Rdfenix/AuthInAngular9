const mongoose = require('mongoose');
const faker = require('faker');
const PersonModel = require('../models/PersonModel');

mongoose.connect(
  'mongodb+srv://rdfenix:@Aiolos92@rudfenix.huk8u.mongodb.net/RudFenix?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function add(n) {
  try {
    for (let i = 0; i < n; i++) {
      const person = new PersonModel();
      person.name = faker.name.firstName();
      person.country = faker.address.country();
      person.email = faker.internet.email();
      person.company = faker.company.companyName();
      await person.save();
    }
  } catch (error) {
    console.log(error);
  }
}

add(100).then(() => {
  console.log('OK');
  mongoose.disconnect();
});
