const Brand = require("../models/brandModel");
const Product = require("../models/productModel");
const { cloudinaryBase64Upload } = require("../utils/cloundinay");

module.exports = {
  addnew: async (req, res) => {
    try {
      const { brandName, image, status } = req.body;

      const check = await Brand.findOne({ brandName });
      if (check) {
        return res.status(401).json({ message: "Thương hiệu đã tồn tại" })
      } else {
        const imageList = [];
        for (const imageItem of image) {
          const imageFile = await cloudinaryBase64Upload(imageItem.base64);
          imageList.push(imageFile);
        }

        const brands = await new Brand({
          brandName,
          image: imageList,
          status
        }
        ).save();
        return res.status(200).json({
          brands
        });
      }

    } catch (error) {
      return res.status(401).json({
        message: `Lỗi:  ${error}`,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const brands = await Brand.find({}).exec();
      return res.status(200).json({
        brands,
      });
    } catch (error) {
      return res.status(401).json({
        message: `Load faile cus ${error}`,
      });
    }
  },
  getAllActive: async (req, res) => {
    try {
      const brands = await Brand.find({
        status: "active"
      }).exec();
      return res.status(200).json({
        brands,
      });
    } catch (error) {
      return res.status(401).json({
        message: `Load faile cus ${error}`,
      });
    }
  },
  getDetailBySlug: async (req, res) => {
    const condition = {
      slug: req.params.slug
    };
    try {
      const Brand = await Brand.findOne(condition).exec();
      const products = await Product.find({
        BrandId: Brand._id,
      })
        .populate(["BrandId"])
        .exec();
      res.status(200).json({
        Brand,
        products,
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeItem: async (req, res, next) => {
    try {
      const cate = await Brand.deleteOne({
        _id: req.params.id
      })
        .then((data) => res.json(data))
        .catch(next);
    } catch (error) {
      res.status(400).send(`Delete failed ${error.message}`);
    }
  },
  getDetail: async (req, res) => {
    try {
      const cate = await Brand.findOne({
        _id: req.params.id
      })
        .exec()
        .then((data) => res.json(data));
    } catch (error) {
      res.status(400).send(`Can't get detail sliders cuz ${error.message}`);
    }
  },
  update: async (req, res) => {
    const condition = {
      _id: req.params.id
    };
    const update = req.body;
    try {
      const cate = await Brand.findOneAndUpdate(condition, update, {
        new: true,
      }).exec();
      res.json(sliders);
    } catch (error) {
      res.status(400).json({
        error: `update  không thành công,${error}`,
      });
    }
  },
  getProductByBrandName: async (req, res) => {
    const condition = { slug: req.params.slug };
    try {
      const brand = await Brand.findOne(condition).exec();
      const products = await Product.find({
        brandId: brand._id,
      })
        .populate(["brandId"])
        .exec();
      res.status(200).json({
        brand,
        products,
      });
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  }
}