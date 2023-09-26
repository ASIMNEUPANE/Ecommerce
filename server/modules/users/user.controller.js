const Model = require('./user.model')

const list = async () => {
  return await Model.find();
};
const create=async(payload)=>{
  return await Model.create(payload)
}

const getById = async(id)=>{
  return await Model.findOne({_id:id})
}

module.exports = {  list,getById,create };
