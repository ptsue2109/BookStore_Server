import User from "../models/authModel";

export const Resgister = async (req, res) => {
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
};
export const Login = async (req, res) => {
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
};

export const refreshToken = async (req, res) => {
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
};
export const List = async (req, res) => {
  try {
    const data = await User.find({}).select("-password").select("-salt").exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send("Load list users failed");
  }
};

export const Add = async (req, res) => {
  try {
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
    const user = await new User(req.body).save().then((data) => res.json(data));
  } catch (error) {
    return res.status(400).send(`Create failed ${error.message}`);
  }
};
export const removeUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
  } catch (error) {
    res.status(400).send(`Delete failed ${error.message}`);
  }
};
export const getDetail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .exec()
      .then((data) => res.json(data));
  } catch (error) {
    res.status(400).send(`Can't get detail user cuz ${error.message}`);
  }
};

export const update = async (req, res) => {
  const condition = { _id: req.params.id };
  const update = req.body;
  try {
    const user = await User.findOneAndUpdate(condition, update, {
      new: true,
    }).exec();
    res.json(user);
  } catch (error) {
    res.status(400).json({
      error: "update user không thành công",
    });
  }
};
