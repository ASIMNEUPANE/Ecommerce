const router = require('express').Router();
const controller = require('./user.controller')
const secureAPI = require('../../utils/secure')





router.get('/',secureAPI(['admin']), async(req,res,next)=>{
    try{
result = await controller.list();
res.json({data:result, msg:"Succes"});
    }
    catch(e){
        next(e)
    }
})
router.get('/:id',secureAPI(['admin', 'user']), async(req,res,next)=>{
    try{
result = await controller.getById(req.params.id);
res.json({data:result, msg:"Succes"});
    }
    catch(e){
        next(e)
    }
})








module.exports= router;