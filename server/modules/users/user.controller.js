const Model = require("./user.model");
const bcrypt = require("bcrypt");

const list = async () => {
  return await Model.find();
};

const create = async (payload) => {
  return await Model.create(payload);
};

const getById = async (id) => {
  return await Model.findOne({ _id: id });
};

const updateById = async (id, payload) => {
  return await Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const changePassword = async (id, oldPassword, newPassword) => {
  // check if user exits
  const user = await Model.findOne({ _id: id }).select("+password");
  if (!user) throw new Error("User not found");
  // check if old pass hash match to existing
  const isValid = await bcrypt.compare(oldPassword, user?.password);
  if (!isValid) throw new Error("oldpassword is incorrect");

  // create new password hash
  const newPass = await bcrypt.hash(newPassword, +process.env.SALT_ROUND);

  // update the userpassword
  return await Model.findOneAndUpdate(
    { _id: user?._id },
    { password: newPass },
    { new: true }
  );
};

const resetPassword = async (id, payload) => {
  const user = await Model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  const newPass = await bcrypt.hash(payload.password, +process.env.SALT_ROUND);
  return await Model.findOneAndUpdate(
    { _id: user?._id },
    { ...payload,password: newPass },
    { new: true }
  );
};

const block = async (id, payload) => {
  const user = await Model.find({ _id: id });
  if (!user) throw new Error("User not found");
  return await Model.findOneAndUpdate({ _id:id}, payload, {new: true})
};

const archive = async (id,payload)=>{
  const user = await Model.find({ _id: id });
  if (!user) throw new Error("User not found");
  return await Model.findOneAndUpdate({ _id:id}, payload, {new: true})
};


module.exports = {
  archive,
  block,
  changePassword,
  create,
  getById,
  list,
  resetPassword,
  updateById,
};
