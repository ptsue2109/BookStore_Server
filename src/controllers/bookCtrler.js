const Product = require("../models/productModel");
module.exports = {
  addProduct: async (req, res) => {
    try {
      const checkItem = await Product.findOne({
        name: req.body.name
      });
      if (checkItem) {
        res.status(401).json({
          message: "sp da ton tai",
        });
      } else {
        const newItem = await new Product(req.body).save();
        return res.status(200).json({
          message: "Add new success",
          newItem,
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "Add failed",
        error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const items = await Product.find({})
        .populate("categoryId")
        .populate("brandId")

        .exec();
      return res.status(200).json({
        items
      });
    } catch (error) {
      res.status(401).json({
        message: "Add failed",
        error,
      });
    }
  },
  getDetail: async (req, res) => {
    try {
      const product = await Product.findOne({
          _id: req.params.id
        })
        .populate("categoryId")
        .populate("brandId")
        .exec();
      return res.status(200).json(product);
    } catch (error) {
      res.status(400).json({
        error: `cant find product cuz ${error}`,
      });
    }
  },

  getDetailBySlug: async (req, res) => {
    try {
      const product = await Product.findOne({
          slug: req.params.slug
        })
        .populate("categoryId")
        .populate("brandId")
        .exec();
      return res.status(200).json(product);
    } catch (error) {
      return res.json(400).send({
        error: "Tìm sản phẩm thất bại",
      });
    }
  },
  remove: async (req, res, next) => {
    const product = await Product.deleteOne({
        _id: req.params.id
      })
      .then((data) => res.json(data))
      .catch(next);
  },
  update: async (req, res) => {
    const condition = {
      _id: req.params.id
    };
    const update = req.body;
    try {
      const product = await Product.findOneAndUpdate(condition, update, {
        new: true
      }).exec();
      res.json(product);
    } catch (error) {
      res.status(400).json({
        error: `update sản phẩm không thành công ,${error}`,
      });
    }
  },
  search: async (req, res) => {
    try {
      const query = req.query.q;
      const result = await Product.find({
        name: {
          $regex: new RegExp(query),
          $options: "i"
        }
      }).populate("categoryId").exec()
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Không tìm thấy kết quả")
    }
  }
}