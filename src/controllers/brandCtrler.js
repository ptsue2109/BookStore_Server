import Brand from "../models/brandModel";
import Product from "../models/productModel";

export const addnew = async (req, res) => {
  try {
    const brands = await new Brand(req.body).save();
    return res.status(200).json({
      brands,
    });
  } catch (error) {
    return res.status(401).json({
      message: `Created faile cus ${error}`,
    });
  }
};

export const getAll = async (req, res) => {
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
};
export const getAllActive = async (req, res) => {
  try {
    const brands = await Brand.find({ status: "active" }).exec();
    return res.status(200).json({
      brands,
    });
  } catch (error) {
    return res.status(401).json({
      message: `Load faile cus ${error}`,
    });
  }
};

export const getDetailBySlug = async (req, res) => {
  const condition = { slug: req.params.slug };
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
};

export const removeItem = async (req, res, next) => {
  try {
    const cate = await Brand.deleteOne({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
  } catch (error) {
    res.status(400).send(`Delete failed ${error.message}`);
  }
};
export const getDetail = async (req, res) => {
  try {
    const cate = await Brand.findOne({ _id: req.params.id })
      .exec()
      .then((data) => res.json(data));
  } catch (error) {
    res.status(400).send(`Can't get detail sliders cuz ${error.message}`);
  }
};

export const update = async (req, res) => {
  const condition = { _id: req.params.id };
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
};


export const getBookByCateName = async (req, res) => {
  try {
    const Brand = await Brand.find({  }).exec();
    const products = await Product.find({ BrandId: Brand })
      .populate(["BrandId"])
      .exec();
    res.status(200).json({
      Brand,
      products,
    });
  } catch (error) {
    res.status(500).send("Lấy sản phẩm thất bại");
  }
}