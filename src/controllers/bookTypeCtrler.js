
import BookType from "../models/bookTypeModel";

export const addnew = async(req,res) =>{
    try {
        const news = await new  BookType(req.body).save();
        return res.status(200).json({
            mess: "add success",
            news
        })
    } catch (error) {
            return res.status(401).json({
                message: `Created faile cus ${error}`
            })
    }
}

export const getAll = async(req,res) =>{
    try {
        const item = await BookType.find({}).exec();
        return res.status(200).json({
            mess: "load success",
            item
        })
    } catch (error) {
        return res.status(401).json({
            message: `Load faile cus ${error}`
        })
    }
}