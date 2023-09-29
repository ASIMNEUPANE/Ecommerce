const slugify = require('slugify')
const categoryModel = require('./category.model')

const slugGenerator = (payload)=>{

    return slugify(payload)

}
const create = async( payload)=>{
    payload.slug = await slugGenerator(payload.name)
    return await categoryModel.create(payload)
}


    const list = async(size,page,search)=>{
 

        const pageNum = parseInt(page) ||1;
        const limit = parseInt(size )|| 5;
        const query = {}
           const response =   await categoryModel.aggregate(
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
    return await categoryModel.findOne({_id:id})
};

const updateById = async(id,payload)=>{
    if(payload.name){payload.slug =slugGenerator(payload.name)}
    return await categoryModel.findOneAndUpdate({_id:id},payload,{new:true})
};

const deleteById = async(id,payload)=>{
      return await categoryModel.findOneAndUpdate({_id:id},payload,{new:true})
}







module.exports= {create,list,getById,updateById,deleteById}