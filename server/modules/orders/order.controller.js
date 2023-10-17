const { v4: uuidv4 } = require("uuid");
const model = require("./order.model");
const productModel = require("../products/product.model");

const create = (payload) => {
  // create unique ID
  payload.id = uuidv4();
  // decrease the product stock after order made
  // const products = payload?.products;
  // products.map(async (product) => {
  //   const { product: id, quantity } = product;
  //   // find the product
  //   const productInfo = await productModel.findOne({ _id: id });
  //   if (!productInfo) throw new Error("product not found");
  //   // update the stock    
  //   // write the new Quantity to product stock
  //   await productModel.findOneAndUpdate(
  //     { _id: id },
  //     { quantity: productInfo?.quantity - quantity },
  //     { new: true }
  //   );
  // });
  // create the order
  
  return model.create(payload);
};

const list = async (limit, page, search) => {
  const pageNum = parseInt(page) || 1;
  const size = parseInt(limit) || 5;
  const { name, role } = search;
  const query = {};
  if (search?.id) {
    query = { id: new RegExp(name, "gi") };
  }
  const response = await model
    .aggregate([
      {
        $match: query,
      },
      {
        $sort: {
          created_at: -1,
        },
      },
      {
        $facet: {
          metadata: [
            {
              $count: "total",
            },
          ],
          data: [
            {
              $skip: (pageNum - 1) * size,
            },
            {
              $limit: size,
            },
          ],
        },
      },
      {
        $addFields: {
          total: {
            $arrayElemAt: ["$metadata.total", 0],
          },
        },
      },
      {
        $project: {
          data: 1,
          total: 1,
        },
      },
      {
        $project: {
          "data.password": 0,
        },
      },
    ])
    .allowDiskUse(true);
  const newData = response[0];
  let { data, total } = newData;
  total = total || 0;
  return { data, total, limit, pageNum };
};

const getById = (id) => {
  return model.findOne({ id });
};
const updateById = (id, payload) => {
  return model.findOneAndUpdate({ id }, payload, { new: true });
};
const deleteById = (id, payload) => {
  // find the product
  const order = model.findOne(id);
  if (!order) throw new Error("order not found");
  //   increase the stock of product
  const products = order.products;
  products.map(async (product) => {
    const { product: id, quantity } = product;
    // update the stock
    const productInfo = await productModel.findOne({ _id: id });
    if (!productInfo) throw new Error("product is not valid");
    const newQuantity = productInfo?.quantity + quantity;
    // write the new quantity to product stocks
    await productModel.findOneAndUpdate(
      { _id: id },
      {
        quantity: newQuantity,
        updated_by: payload?.updated_by,
        updated_at: payload?.updated_at,
      },
      { new: true }
    );
  });

  return model.deleteOne({ id });
};

module.exports = { create, list, getById, updateById, deleteById };
