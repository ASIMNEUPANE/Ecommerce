require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const productController = require("../modules/products/product.model");
const userControllor = require("../modules/users/user.model");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();

    console.log("DB reset");
    console.log("Creating Admin user");
    const payloads = [
      {
        name: "Raktim Admin",
        email: "rakimsth@gmail.com",
        password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
        isEmailVerified: true,
        roles: ["admin"],
      },
      {
        name: "Asim Admin",
        email: "asimneupane11@gmail.com",
        password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
        isEmailVerified: true,
        roles: ["admin"],
      },
    ];
    await userControllor.create(payloads);
    console.log("---------DONE----------");

    console.log("Creating Normal user");
    const userPayload = [
      {
        name: "Raktim User",
        email: "raktim@rumsan.com",
        password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
        isEmailVerified: true,
      },
      {
        name: "Asim User",
        email: "asimn11@gmail.com",
        password: await bcrypt.hash("12345", +process.env.SALT_ROUND),
        isEmailVerified: true,
      },
    ];
    await userControllor.create(userPayload);
    console.log("Done");

    ("--------------------------------------------------------------------------------------");

    console.log("DB reset");
    console.log("creating T-shirt  ");
    const payload = [
      {
        name: "Armani tshirt",
        description: "Best pants in the town",
        type: "tshirt",
        price: 2000,
        isRelease: true,
      },
      {
        name: "zara tshirt",
        description: "Best pants in the town",
        type: "tshirt",
        price: 3000,
        isRelease: true,
      },
    ];
    await productController.create(payload);

    console.log("-----DONE-----");

    console.log("DB reset");
    console.log("creating pants ");
    const pantPayload = [
      {
        name: "H&M pants",
        description: "Best pants in the town",
        type: "pants",
        price: 2500,
        isRelease: true,
      },
      {
        name: "gucci pants",
        description: "world class pants",
        type: "pants",
        price: 5000,
        isRelease: true,
      },
    ];
    await productController.create(pantPayload);
    console.log("done");
  },
};

setup.initialize();
