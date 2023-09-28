const productModel = require('./product.model')

const create = async(payload)=>{
return await productModel.create(payload)

}

const list = async()=>{
 
    return await productModel.find()
}

const getById = async(id)=>{
return await productModel.findOne({_id:id});
}

const updateById= async(id,payload)=>{
return await productModel.findOneAndUpdate({_id:id},payload,{new:true})
}

const deleteById= async(id)=>{

return await productModel.deleteOne({_id:id})

}



module.exports={create,list,getById,updateById,deleteById};