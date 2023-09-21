const bcrypt = require("bcrypt");
const authModel = require("../auth/auth.model");
const userModel = require("../users/user.model");

const { generateOTP } = require("../../utils/otp");

const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User doesnot exit");
  if (!user.isEmailVerified)
    throw new Error("Email not verify.Verify email to get started..");
  if (!user?.isActive)
    throw new Error("User is not active. Please contact admin");
  const isValidPw = await bcrypt.compare(password, user?.password);
  if (!isValidPw) throw new Error("User or password invalid");

  return true;
};

const create = async (payload) => {
  let { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUND);
  const user = await userModel.create(rest);
  
  const authpayload = { email: user?.email, token: generateOTP() };
  await authModel.create(authpayload);
  return user;
};

module.exports = { login, create };
