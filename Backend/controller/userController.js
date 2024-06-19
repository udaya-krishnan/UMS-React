const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config");

const securePassword = async (password) => {
  try {
    const hashBcrypt = await bcrypt.hash(password, 10);
    if (hashBcrypt) {
      return hashBcrypt;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const emailExits = await User.findOne({ email: email });
    if (emailExits) {
      res.json({ status: "emailExits" });
    } else {
      const hashPassword = await securePassword(password);
      if (hashPassword) {
        const newUser = new User({
          name: name,
          email: email,
          mobile: mobile,
          password: hashPassword,
        });
        await newUser.save();

        res.json({ status: "sucess" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      const passMatching = await bcrypt.compare(password, findUser.password);
      if (passMatching) {
        const token = await generateToken({ id: findUser._id });
        console.log(findUser);
        let data = {};

        for (let key in findUser.toObject()) {
          if (key !== "password") {
            data[key] = findUser[key];
          }
        }

        res.json({
          token: token,
          data: data,
        });
      } else {
        res.json({ status: "incorrect" });
      }
    } else {
      res.json({ status: "usernotfound" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addImage = async (req, res) => {
  try {
    const image = req.file.filename;
    const id = req.body.userId;

    const findUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        image: image,
      }
    );

    let data = {};

    if (findUser) {
      const Data = await User.findOne({ _id: id });

      for (let key in Data.toObject()) {
        if (key !== "password") {
          data[key] = Data[key];
        }
      }

      res.json({
        data: data,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const profileEdit = async (req, res) => {
  try {
    const { name, mobile, userId } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          name: name,
          mobile: mobile,
        },
      }
    );
    if (updateUser) {
      const data={}
      const Data = await User.findOne({ _id: userId });

      for (let key in Data.toObject()) {
        if (key !== "password") {
          data[key] = Data[key];
        }
      }

      res.json({
        data: data,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerUser,
  verifyUser,
  addImage,
  profileEdit,
};
