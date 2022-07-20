const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
module.exports = {
  addnew: async (req, res) => {
    try {
      const news = await new Category(req.body).save();
      return res.status(200).json({
        mess: "add success",
        news,
      });
    } catch (error) {
      return res.status(401).json({
        message: `Created faile cus ${error}`,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const categories = await Category.find({}).exec();
      return res.status(200).json({
        mess: "load success",
        categories,
      });
    } catch (error) {
      return res.status(401).json({
        message: `Load faile cus ${error}`,
      });
    }
  },

  getAllActive: async (req, res) => {
    try {
      const categories = await Category.find({ status: "active" }).exec();
      return res.status(200).json({
        mess: "load success",
        categories,
      });
    } catch (error) {
      return res.status(401).json({
        message: `Load faile cus ${error}`,
      });
    }
  },

  getDetailBySlug: async (req, res) => {
    const condition = { slug: req.params.slug };
    try {
      const category = await Category.findOne(condition).exec();
      const books = await Product.find({
        categoryId: category._id,
      })
        .populate(["categoryId"])
        .exec();
      res.status(200).json({
        category,
        books,
      });
    } catch (error) {
      console.log(error);
    }
  },

  removeItem: async (req, res, next) => {
    try {
      const cate = await Category.deleteOne({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
    } catch (error) {
      res.status(400).send(`Delete failed ${error.message}`);
    }
  },
  getDetail: async (req, res) => {
    try {
      const cate = await Category.findOne({ _id: req.params.id })
        .exec()
        .then((data) => res.json(data));
    } catch (error) {
      res.status(400).send(`Can't get detail sliders cuz ${error.message}`);
    }
  },
  update: async (req, res) => {
    const condition = { _id: req.params.id };
    const update = req.body;
    try {
      const cate = await Category.findOneAndUpdate(condition, update, {
        new: true,
      }).exec();
      res.json(cate);
    } catch (error) {
      res.status(400).json({
        error: `update  không thành công,${error}`,
      });
    }
  },
  getBookByCateName: async (req, res) => {
    try {
      const category = await Category.find({}).exec();
      const products = await Product.find({ categoryId: category })
        .populate(["categoryId"])
        .exec();
      res.status(200).json({
        category,
        products,
      });
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  },
};
