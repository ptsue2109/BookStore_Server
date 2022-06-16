import mongoose, { Schema } from "mongoose";
import { createHmac } from "crypto";
import { v4 as uuidv4 } from 'uuid';
const userSchema = new Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   username: { type: String, required: true, maxlength: 100 },
   phoneNumber: { type: String, maxlength: 20,required: true, unique: true},
   address: { type: String },
   desc: { type: String },
   role: { type: String, default: 'user' },
   salt: { type: String },
   image: {type: String},
   status: {type: String, default: "active"}
}, { timestamps: true });

userSchema.pre("save", function (next) {
   this.salt = uuidv4()
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
         return createHmac("sha256", this.salt).update(password).digest("hex");
      } catch (error) {
         console.log(error);
      }
   }
}
export default mongoose.model("User", userSchema);
