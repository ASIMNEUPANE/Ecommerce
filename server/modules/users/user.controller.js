const Model = require('./user.model')

const list = async () => {
  return await Model.find();
};

const deleteById = async (id) => {
  return await Model.deleteOne({ _id: id });
};

module.exports = {  deleteById, list };
