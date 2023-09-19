
const Model = require("./user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const list = async () => {
  return await Model.find();
};


const create = async (payload) => {
    let {password, ...rest} = payload;
    rest.password =   await bcrypt.hash(password, saltRounds)
  return await Model.create(rest);


  
};
const login = async(email,password)=>{
    const userExit = await Model.findOne({email})
if(!userExit) throw new Error("User doesnot exit")
const isValid = await bcrypt.compareSync(password, userExit.password); 
if(!isValid) throw new Error("User or password invalid")

return true;
}

const deleteById = async (id) => {
  return await Model.deleteOne({ _id: id });
};

module.exports = { create, deleteById, list , login};
