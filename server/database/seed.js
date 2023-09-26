require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Controller = require("../modules/users/user.controller");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
    console.log("creating admin user ");
    const payload = {
      name: "Asim Neupane",
      email: "asimneupane11@gmail.com",
      password: await bcrypt.hash("password", +process.env.SALT_ROUND),
      isEmailVerified: true,
      isActive: true,
      roles: ["admin"],
    };
    await Controller.create(payload);

    console.log("-----DONE-----");

    console.log("DB reset");
    console.log("creating Normal user ");
    const userPayload = {
      name: "Asim User",
      email: "asim11@gmail.com",
      password: await bcrypt.hash("password", +process.env.SALT_ROUND),

      isEmailVerified: true,
      isActive: true,
    };
    await Controller.create(userPayload);
    console.log("done");
  },
};

setup.initialize();
