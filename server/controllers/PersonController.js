const PersonModel = require('../models/PersonModel');

const PersonController = {
  all: (req, res) => {
    PersonModel.find({})
      .lean()
      .exec((err, people) => {
        if (err) return res.json(err);

        return res.json(people);
      });
  },
};

module.exports = PersonController;
