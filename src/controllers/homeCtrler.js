// import Product from "../models/productModel";
// import Sliders from "../models/slidersModels";
// import Target from "../models/targetModel";
// import BookSize from "../models/bookSizeModel";
// import BookType from "../models/bookTypeModel";
// import Author from "../models/authorModel";
// import User from "../models/authModel";
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
