import Product from "../models/productModel";

export const addProduct = async (req, res) => {
  try {
    const checkItem = await Product.findOne({ name: req.body.name });
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
};

export const getAll = async (req, res) => {
  try {
    const items = await Product.find({})
      .populate("targetId")
      .populate("categoryId")
      .populate("bookTypeId")
      .populate("bookSizeId")
      .populate("authorId")
      .exec();
    return res.status(200).json({
      message: "Load success",
      items,
    });
  } catch (error) {
    res.status(401).json({
      message: "Add failed",
      error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("targetId")
      .populate("categoryId")
      .populate("bookTypeId")
      .populate("bookSizeId")
      .populate("authorId")
      .exec();
    return res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      error: `cant find product cuz ${error}`,
    });
  }
};

export const getDetailBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("targetId")
      .populate("categoryId")
      .populate("bookTypeId")
      .populate("bookSizeId")
      .populate("authorId")
      .exec();
    return res.status(200).json(product);
  } catch (error) {
    return res.json(400).send({
      error: "Tìm sản phẩm thất bại",
    });
  }
};
export const remove = async (req, res, next) => {
  const product = await Product.deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
};
export const update = async (req, res) => {
  const condition = { _id: req.params.id };
  const update = req.body;
  try {
    const product = await Product.findOneAndUpdate(condition, update,{new: true}).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({
      error: `update sản phẩm không thành công ,${error}`,
    });
  }
};
export const search = async (req,res) =>{
  try {
    const query = req.query.q;
    const result = await Product.find({ name: { $regex: new RegExp(query), $options: "i" } }).populate("categoryId").exec()
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Không tìm thấy kết quả")
  }
}
