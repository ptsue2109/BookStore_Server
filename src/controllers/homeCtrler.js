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

// import Order from "../models/orderModel";
// export const getHomeData = async (req, res) => {
//   try {
//     const books = await Product.find({}).exec();
//     const sliders = await Sliders.find({}).exec();
//     const target = await Target.find({}).exec();
//     const bookSize = await BookSize.find({}).exec();
//     const bookType = await BookType.find({}).exec();
//     const author = await Author.find({}).exec();
//     const user = await User.find({}).exec();
//     const orders = await Order.find({}).exec();
//     const productsNew = await Product.find({})
//       .sort({ createdAt: -1 })
//       .limit(12)
//       .exec();

//     const mangaBooks = await Product.find({
//       categoryId: "62aedd8d417d52db9dc76bab",
//     })
//       .limit(6)
//       .populate(["categoryId"])
//       .exec();
//     const doraemon = await Product.find({name:{$regex:"doraemon",$options:"$i"}}).exec();
//     res.status(200).json({
//       books,
//       sliders,
//       bookSize,
//       bookType,
//       target,
//       author,
//       user,
//       orders,
//       productsNew,
//       mangaBooks,
//       doraemon,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: `Load data thất bại  ${error}`,
//     });
//   }
// };