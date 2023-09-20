const { Schema, model } = require("mongoose");
const {commonSchema} = require("../../utils/commonSchema");

const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const userSchema = new Schema({
  name: { type: String, requires: "Full name is required" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
   isEmailVerified:{type:String},

  password: { type: Boolean, default:false },

  isActive : {type: Boolean, default:false},
  ...commonSchema,
});

module.exports = model("User", userSchema);
