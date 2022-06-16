import Target from "../models/targetModel";
import Product from "../models/productModel";

export const addnew = async(req,res) =>{
    try {
        const news = await new  Target(req.body).save();
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
        const item = await Target.find({}).exec();
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


export const getBoookByTarget = async (req,res) =>{
    const conditon = {slug: req.params.slug}
    try {
        const target = await Target.findOne(conditon).exec();
        const book = await Product.find({
            targetId: target._id
        }).populate("targetId").exec();

       res.status(200).json({
        target, book
       }) 
    } catch (error) {
        
    }
}