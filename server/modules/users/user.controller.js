const Model = require("./user.model");

const list = async () => {
  return await Model.find();
};

const create = async (payload) => {
  return await Model.create(payload);
};

const deleteById = async (id) => {
  return await Model.deleteOne({ _id: id });
};

module.exports = { create, deleteById, list };
