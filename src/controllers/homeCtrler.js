const Product = require("../models/productModel");
const User = require("../models/authModel");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const Sliders = require("../models/slidersModels")
module.exports = {
  getHomeData: async (req, res) => {
    try {
      const user = await User.find({}).exec();
      const products = await Product.find({}).populate("brandId").populate("categoryId").exec();
      const categories = await Category.find({}).exec();
      const newProducts = await Product.find({})
        .sort({
          createdAt: -1
        })
        .limit(12).
      populate("brandId").
      populate("categoryId")
        .exec();
      const brands = await Brand.find({}).exec();
      const sliders = await Sliders.find({}).exec();
      res.status(200).json({
        user,
        newProducts,
        categories,
        products,
        brands,
        sliders
      });
    } catch (error) {
      return res.status(400).json({
        message: `Load data thất bại  ${error}`,
      });
    }
  },
};