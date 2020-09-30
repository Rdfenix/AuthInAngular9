const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const variables = require('../consts');

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFound = await UserModel.findOne({ email });
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
        const authError = password == '' || password == null || !user;
        if (!authError) {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ _id: user._id }, variables.keyJWT, {
              expiresIn: variables.expiresJWT,
            });
            delete user.password;
            return res.json({
              ...user,
              token,
            });
          }
        }

        return res.status(404).json({ message: 'Wrong email or password' });
        // if (auth_error) {
        //   return res.status(404).json({ message: "Wrong email or password" });
        // }
      });
  },

  checkToken: (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(token, variables.keyJWT, (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).json({ message: 'Wrong token' });
      }
      next();
    });
  },

  userData: (req, res) => {
    const token = req.get('Authorization');
    jwt.verify(token, variables.keyJWT, (err, decoded) => {
      const id = decoded._id;
      UserModel.findById(id)
        .lean()
        .exec((error, user) => {
          if (error || !user) {
            return res.status(500).json({
              message: 'Error wher trying to fetch user data',
              error,
            });
          }
        });
    });
  },
};

module.exports = AuthController;
