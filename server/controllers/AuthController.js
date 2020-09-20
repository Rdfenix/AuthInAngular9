const UserModel = require('./../models/UserModel');
const bcrypt = require('bcryptjs');
const variables = require('./../consts');
const jwt = require('jsonwebtoken');

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      let userFound = await UserModel.findOne({ email });
      if (!userFound) {
        const user = new UserModel(req.body);
        user.password = bcrypt.hashSync(password, variables.bcryptSalts);
        await user.save();
        delete user.password;
        res.status(200).json(user);
      } else {
        res
          .status(403)
          .json({ message: 'Email already registered', error: {} });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error while saving the user ', error });
    }
  },
  login: (req, res) => {
    const { password, email } = req.body;
    UserModel.findOne({ email })
      .lean()
      .exec((err, user) => {
        if (err) {
          res.status(500).json({ message: 'Server Error', error: err });
        }

        const auth_error = password == '' || password == null || !user;

        if (!auth_error) {
          if (bcrypt.compareSync(password, user.password)) {
          }
        }

        // if (auth_error) {
        //   return res.status(404).json({ message: "Wrong email or password" });
        // }
      });
  },
};

module.exports = AuthController;
