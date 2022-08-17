
const Sliders = require("../models/slidersModels");
const { cloudinaryBase64Upload } = require("../utils/cloundinay");

module.exports = {
    addnew : async(req,res) =>{
        try {
            const { slideName, image, URL,status } = req.body;
            const check = await Sliders.findOne({ slideName }).exec();
            if (check) {
                return res.status(400).json({
                    message: "slider da ton tai",
                  });
            } else {
              const imageList = [];
              for (const imageItem of image) {
                const imageFile = await cloudinaryBase64Upload(imageItem.base64);
                imageList.push(imageFile);
              }
              const sliders = await new Sliders({
                slideName, 
                image: imageList,
                status,
                URL
              }).save();
              return res.status(200).json({
                sliders
              });
            }
          } catch (error) {
            return res.status(200).json({
              message: `FAIL:  ${error}`,
            });
          }
    } , 
    getAll : async(req,res) =>{
        try {
            const sliders = await Sliders.find({}).exec();
            return res.status(200).json({
                sliders
            })
        } catch (error) {
            return res.status(401).json({
                message: `Load faile cus ${error}`
            })
        }
    },
    removeItem : async (req, res, next) => {
        try {
            const sliders = await Sliders.findByIdAndDelete({ _id: req.params.id }).exec();
            return res.status(200).json(sliders);
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




