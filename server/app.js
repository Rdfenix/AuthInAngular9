const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const api = require('./routes/route');
const auth = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  'mongodb+srv://rdfenix:@Aiolos92@rudfenix.huk8u.mongodb.net/RudFenix?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use('/api', api);
app.use('/auth', auth);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
  next();
});

app.listen(3000, () => {
  console.log('RUNNING');
});
