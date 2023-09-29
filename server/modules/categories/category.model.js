const {schema,model, Schema}= require('mongoose');

const {ObjectId}= Schema.Types;

const {commonSchema}= require('../../utils/commonSchema')

const categorySchema = new Schema({
   
    name: { type: String, required: "category name is required" },
   slug:{type:String, required:true, unique:true},

    type: { type: String, required: "Product type is required", maxLength:15 },
    description: {
        type: String,
        required: "Category description is required",
        maxLength: 250,
      },
      ...commonSchema,

})



module.exports = model('Category', categorySchema)

