const productModel = require('./product.model')

const create = async(payload)=>{
  
return await productModel.create(payload)

}

const list = async(size,page,search)=>{
 

const pageNum = parseInt(page) ||1;
const limit = parseInt(size )|| 5;
const {name}= search;
const query = {}
if(name){
  query.name = new RegExp(name, 'gi')
}
   const response =   await productModel.aggregate(
        [
            {
              '$match': 
               query
              
            }, {
              '$sort': {
                'created_at': -1
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
  const{products,...rest}= payload
return await productModel.findOneAndUpdate({_id:id},rest,{new:true})
}

const deleteById= async(id,payload)=>{

return await productModel.findOneAndUpdate({_id:id},payload,{new:true})

}
const approve = async (id, payload)=>{
  const {status}= payload;
  return model.findOneAndUpdate({id}, {status}, {new:true})
}



module.exports={approve,create,list,getById,updateById,deleteById};