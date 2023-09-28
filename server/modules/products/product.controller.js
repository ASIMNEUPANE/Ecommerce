const productModel = require('./product.model')

const create = async(payload)=>{
return await productModel.create(payload)

}

const list = async(size,page,search)=>{
 

const pageNum = parseInt(page) ||1;
const limit = parseInt(size )|| 5;
const query = {}
   const response =   await productModel.aggregate(
        [
            {
              '$match': 
               query
              
            }, {
              '$sort': {
                'created_at': 1
              }
            }, {
              '$facet': {
                'metadata': [
                  {
                    '$count': 'total'
                  }
                ], 
                'data': [
                  {
                    '$skip': (pageNum -1)* limit
                  }, {
                    '$limit': limit
                  }
                ]
              }
            }, {
              '$addFields': {
                'total': {
                  '$arrayElemAt': [
                    '$metadata.total', 0
                  ]
                }
              }
            }, {
              '$project': {
                'data': 1, 
                'total': 1
              }
            }
          ]
    ).allowDiskUse(true);
    const newData = response[0];
    const {data,total}= newData;
    return {data,total,limit,pageNum}
}

const getById = async(id)=>{
return await productModel.findOne({_id:id});
}

const updateById= async(id,payload)=>{
return await productModel.findOneAndUpdate({_id:id},payload,{new:true})
}

const deleteById= async(id)=>{

return await productModel.deleteOne({_id:id})

}



module.exports={create,list,getById,updateById,deleteById};