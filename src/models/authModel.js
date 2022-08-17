const mongoose= require("mongoose");
const crypto = require("crypto");
const uuid= require('uuid');

const userSchema = mongoose.Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String,},
   username: { type: String,  maxlength: 100 },
   phoneNumber: { type: String, maxlength: 20,unique: true},
   address: { type: String },
   desc: { type: String },
   role: { type: String, default: 'user' },
   salt: { type: String },
   image: {type: Object},
   status: {type: String, default: "active"},
   provider:{type: String}
}, { timestamps: true });

userSchema.pre("save", function (next) {
   this.salt = uuid.v4()
   this.password = this.encryptPassword(this.password)
   next();
});

userSchema.methods = {
   authenticate(password) {
      return this.password === this.encryptPassword(password)
   },
   encryptPassword(password) {
      if (!password) return
      try {
         return crypto.createHmac("sha256", this.salt).update(password).digest("hex");
      } catch (error) {
         console.log(error);
      }
   }
}
module.exports = mongoose.model("User", userSchema);
