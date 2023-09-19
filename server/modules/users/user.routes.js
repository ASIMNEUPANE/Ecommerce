const router = require('express').Router();
const controller = require('./user.controller')




router.post('/', async(req,res,next)=>{
    try{
result = await controller.create(req.body);
res.json({data:result, msg:"Succes"});
    }
    catch(e){
        next(e)
    }
})
router.post('/login', async(req,res,next)=>{
    try{
        const {email,password}= req.body
        if (! email || !password) throw new Error("Email or Password is missing")
result = await controller.login(email,password);
res.json({data:result, msg:"Succes"});
    }
    catch(e){
        next(e)
    }
})


router.get('/', async(req,res,next)=>{
    try{
result = await controller.list();
res.json({data:result, msg:"Succes"});
    }
    catch(e){
        next(e)
    }
})

router.delete('/:id', async(req,res,next)=>{
    try{
result = await controller.deleteById(req.params);
res.json({data:result, mssg: "Succes"});
    }
    catch(e){
        next(e)
    }
})






module.exports= router;