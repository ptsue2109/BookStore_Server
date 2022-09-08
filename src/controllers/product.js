import { cloudinaryBase64Upload } from "../utils/cloundinay";
const Product = require("../models/product");


module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, image, brandId, categoryId, cost, desc, slug , stock} = req.body;

      const checkItem = await Product.findOne({ name });

      if (checkItem) {
        return res.status(401).json({ message: "sp da ton tai" });
      } 
      else {
        const imageList = [];
        for (const imageItem of image) {
            const imageFile = await cloudinaryBase64Upload(imageItem.base64);
            imageList.push(imageFile);
        }

        const data = await new Product({
          name,
          image: imageList,
          brandId,
          categoryId,
          cost,
          stock,
          desc,
          slug,
        }).save();
        return res.status(200).json({
          data,
        });
      }
    } catch (error) {
      res.status(401).json({
        message: `Thêm thất  bbaji ${error}`,
       
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
        items,
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
        _id: req.params.id,
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
        slug: req.params.slug,
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
    try {
      const product = await Product.findByIdAndDelete({
        _id: req.params.id,
      }).exec();
      return res.status(200).json(product);
    } catch (error) {
      return res.json(400).send({
        error: "Xoa sản phẩm thất bại",
      });
    }
    
  },
   update: async (req, res) => {
    try {
        const { name, image, price, cost,stock, desc, isFeature, categoryId, brandId } = req.body;

        const imageList = [];
        for (const imageItem of image) {
            if (imageItem.base64) {
                const imageFile = await cloudinaryBase64Upload(imageItem.base64);
                imageList.push(imageFile);
            } else {
                imageList.push(imageItem);
            }
        }

        const product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name,
                    image: imageList,
                    desc,
                    isFeature,
                    categoryId,
                    brandId,
                    price,
                    cost,
                    stock
                },
            },
            { new: true }
        ).exec();
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({message: `Cập nhật sản phẩm thất bại: ${error}`});
    }
},
  search: async (req, res) => {
    try {
      const query = req.query.q;
      const result = await Product.find({
        name: {
          $regex: new RegExp(query),
          $options: "i",
        },
      })
        .populate("categoryId")
        .populate("brandId")
        .exec();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Không tìm thấy kết quả");
    }
  },
  getProductsSearch: async (req, res) => {
    try {
      const products = await Product.find({
        name: { $regex: new RegExp(req.body.keyword), $options: "i" },
      }).exec();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
  },
};
