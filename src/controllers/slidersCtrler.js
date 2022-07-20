
const Sliders = require("../models/slidersModels");
module.exports = {
    addnew : async(req,res) =>{
        try {
            const news = await new  Sliders(req.body).save();
            return res.status(200).json({
                mess: "add success",
                news
            })
        } catch (error) {
                return res.status(401).json({
                    message: `Created faile cus ${error}`
                })
        }
    } , 
    getAll : async(req,res) =>{
        try {
            const item = await Sliders.find({}).exec();
            return res.status(200).json({
                mess: "load success",
                item
            })
        } catch (error) {
            return res.status(401).json({
                message: `Load faile cus ${error}`
            })
        }
    },
    removeItem : async (req, res, next) => {
        try {
            const user = await Sliders.deleteOne({ _id: req.params.id })
                .then((data) => res.json(data))
                .catch(next)
        } catch (error) {
            res.status(400).send(`Delete failed ${error.message}`);
        }
    },
    getDetail : async (req, res) => {
        try {
            const sliders = await Sliders.findOne({ _id: req.params.id }).exec()
                .then((data) => res.json(data))
        } catch (error) {
            res.status(400).send(`Can't get detail sliders cuz ${error.message}`);
        }
    },
    update : async (req, res) => {
        const condition = { _id: req.params.id }
        const update = req.body;
        try {
            const sliders = await Sliders.findOneAndUpdate(condition, update, { new: true }).exec();
            res.json(sliders);
        } catch (error) {
            res.status(400).json({
                error: "update user không thành công"
            })
        }
    }
    

}




