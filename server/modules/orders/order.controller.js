const { v4: uuidv4 } = require('uuid');
const model = require('./order.model')
const productModel = require('../products/product.model')

const create = (payload)=>{
    payload.id = uuidv5();
    return model.create(payload)

}

const list = async (limit, page, search) => {
    const pageNum = parseInt(page) || 1;
    const size = parseInt(limit) || 5;
    const { name, role } = search;
    const query = {};
    if (search?.name) {
      query.name = new RegExp(name, "gi");
    }
    const response = await model.aggregate([
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
    ]).allowDiskUse(true);
    const newData = response[0];
    let { data, total } = newData;
    total = total || 0;
    return { data, total, limit, pageNum };
  };
  



const getById = (id)=>{
    return model.findOne({id})

}
const updateById = (id,payload)=>{
    return model.findOneAndUpdate({id},payload,{new:true})

}
const deleteById = (id)=>{
    return model.deleteOne({id})

}

module.exports= {create,list,getById,updateById,deleteById}



