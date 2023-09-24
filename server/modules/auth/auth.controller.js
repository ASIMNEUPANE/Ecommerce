const bcrypt = require("bcrypt");
const authModel = require("../auth/auth.model");
const userModel = require("../users/user.model");

const { generateOTP, verifyOTP } = require("../../utils/otp");

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

const verifyEmail = async (email, token) => {
  // email exists check

  const auth = await authModel.findOne({ email });
  if (!auth) throw new Error("user not found");

  // token expire check

  const isValidToken = await verifyOTP(token);
  if (!isValidToken) throw new Error("Token expired");

  // token match with email
  const emailValid = authModel?.token === +token;
  if (!emailValid) throw new Error("Token mismathc");

  // userModel isEmailVerified True
  const updateUser = await userModel.findOneAndUpdate(
    { email },
    { isEmailVerified: true },
    { new: true }
  );

  // remove that email from authModel
await authModel.deleteOne({ email });
 return updateUser;
};

const regenerateToken = async(email)=>{

  const auth = await authModel.findOne({email});
  if (!auth) throw new Error('User not found')

  const newToken = await generateOTP();
  await authModel.findOneAndUpdate(
    {email},
    {token :newToken},
    {new:true}

  );
  return true;

}


module.exports = { login, create , verifyEmail,regenerateToken };
