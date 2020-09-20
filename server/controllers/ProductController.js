const ProductModel = require('../models/ProductModel');

const ProductController = {
  all: (req, res) => {
    ProductModel.find({})
      .lean()
      .exec((err, products) => {
        if (err) return res.json(err);

        return res.json(products);
      });
  },
};

module.exports = ProductController;
