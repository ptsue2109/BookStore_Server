import Author from "../models/authorModel";
import Product from "../models/productModel"
export const createAuthor = async (req, res) => {
  try {
    const check = await Author.findOne({
      authorName: req.body.authorName,
    }).exec();
    if (check) {
      return res.status(200).json({ message: "Author đã tồn tại " });
    } else {
      const author = await Author(req.body).save();
      return res.status(200).json(author);
    }
  } catch (error) {
    return res.status(400).json({ message: `Create fail: ${error}` });
  }
};

export const getAllAuthor = async (req, res) => {
  try {
    const author = await Author.find({}).exec();
    return res.status(200).json({
      author,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Failed : ${error}`,
    });
  }
};

export const getOneAuthor = async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id }).exec();
    return res.status(200).json({
      message: "Get success",
      author,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Failed : ${error}`,
    });
  }
};

export const updateAuthor = async (req, res) => {
  const condition = { _id: req.params.id };
  const update = req.body;
  try {
    const author = await Author.findOneAndUpdate(condition, update).exec();
    return res.status(200).json({
      message: "Update success",
      author,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Failed : ${error}`,
    });
  }
};


export const removeAuthor = async (req,res,next)=>{
    const author = await Author.deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
}


export const getBookByAuthor = async(req,res,next) =>{
  try {
    const author = await Author.findOne({ slug: req.params.slug}).exec();
    const Authbooks = await Product.find({
      authorId: author._id
    }).populate(["authorId"]).exec();
    res.status(200).json({author,Authbooks})
  } catch (error) {
    return res.status(400).json({
      message: `Failed : ${error}`,
    });
  }
}