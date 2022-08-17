const User = require("../models/authModel");
import { cloudinaryBase64Upload } from "../utils/cloundinay";
module.exports = {
  Resgister: async (req, res) => {
    const { email, username, password, phoneNumber } = req.body;
    try {
      const existUser = await User.findOne({ email }).exec();
      const phoneCheck = await User.findOne({ phoneNumber }).exec();
      if (existUser) {
        return res.status(400).json({
          message: "Tài khoản đã tồn tại",
        });
      }
      if (phoneCheck) {
        return res.status(400).json({
          message: "SDT đã được đăng kí",
        });
      }
      const user = await new User({
        email,
        username,
        password,
        phoneNumber,
      }).save();
      return res.status(200).json({
        message: "Đăng ký thành công",
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          phoneNumber: user.phoneNumber,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: "Đăng ký thất bại",
        error,
      });
    }
  },
  Login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.status(400).send("Không tìm thấy tài khoản");
      }
      if (!user.authenticate(password)) {
        return res.status(400).send("Mật khẩu không chính xác");
      }
      if (user && user.authenticate(req.body.password)) {
        return res.json({
          message: "Login success",
          token: ({ id: user._id }, { expiresIn: "10d" }),
          user,
        });
      }
      res.status(400).json({ message: "Invalid email,password" });
    } catch (error) {
      res.status(400).json({ message: `BE: ${error.message}` });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(403).send("Không được phép truy cập");
      }

      verifyToken(token, process.env.REFRESH_TOKEN_SECRET, (user, error) => {
        if (error) return res.status(401).send("Không có quyền truy cập");
        req.user = user;
      });

      const accessToken = generateToken(
        { _id: req.user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        accessToken,
      });
    } catch (error) {
      return res.status(500).send("Tạo mới token thất bại");
    }
  },
  List: async (req, res) => {
    try {
      const data = await User.find({})
        .select("-password")
        .select("-salt")
        .exec();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send("Load list users failed");
    }
  },
  Add: async (req, res) => {
    try {
      const {
        username,
        image,
        email,
        password,
        status,
        role,
        phoneNumber,
        address,
      } = req.body;

      const mailCheck = await User.findOne({ email: req.body.email }).exec();
      const phoneCheck = await User.findOne({
        phoneNumber: req.body.phoneNumber,
      }).exec();
      if (mailCheck) {
        return res.status(400).send("Email đã tồn tại");
      }
      if (phoneCheck) {
        return res.status(400).send("SDT  đã được đăng kí");
      }
      const imageList = [];
      for (const imageItem of image) {
        const imageFile = await cloudinaryBase64Upload(imageItem.base64);
        imageList.push(imageFile);
      }
      const data = await new User({
        username,
        image: imageList,
        email,
        password,
        status,
        role,
        phoneNumber,
        address,
      }).save();
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(400).send(`Create failed ${error.message}`);
    }
  },
  removeUser: async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.id }).exec();
      return res.status(200).json(user);
    } catch (error) {
      res.status(400).send(`Delete failed ${error.message}`);
    }
  },
  getDetail: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .exec()
        .then((data) => res.json(data));
    } catch (error) {
      res.status(400).send(`Can't get detail user cuz ${error.message}`);
    }
  },
  update: async (req, res) => {
    try {
      const {
        username,
        image,
        email,
        password,
        status,
        role,
        newPassword,
        phoneNumber,
        address,
      } = req.body;

      const imageList = [];
      for (const imageItem of image) {
        if (imageItem.base64) {
          const imageFile = await cloudinaryBase64Upload(imageItem.base64);
          imageList.push(imageFile);
        } else {
          imageList.push(imageItem);
        }
      }
      
      const pwUser = await User.findOne({ _id: req.params.id }).exec();
      if(req.body.newPassword){
         if (pwUser.authenticate(req.body.newPassword)) return res.status(500).json({ message: "Không được trùng với mật khẩu cũ"});
      }
      const hashPassword = pwUser.encryptPassword(req.body.newPassword);

      const users = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            username,
            image: imageList,
            email,
            password:hashPassword ? hashPassword : password,
            status,
            role,
            phoneNumber,
            address,
          },
        },
        { new: true }
      ).exec();

      users.password = null;
      return res.status(201).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Cập nhật users thất bại: ${error}` });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).exec();
      if (user.authenticate(req.body.newPassword)) return res.status(400).json("Mật khẩu mới không được trùng với mật khẩu cũ");
      const hashPassword = user.encryptPassword(req.body.newPassword);
      await User.findOneAndUpdate({ _id: req.params.id }, { password: hashPassword }, { new: true }).exec();
      user.password = null;
      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json("Đổi mật khẩu thất bại")
    }
  },
  
};
