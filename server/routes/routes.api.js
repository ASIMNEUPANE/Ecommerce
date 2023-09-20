const router= require('express').Router()
const authRouter = require('../modules/auth/auth.routes')
const userRouter = require('../modules/users/user.routes')

router.get('/', (req,res,next)=>{
    res.json({data:"", mssg :("api router is working")})
});

router.use('/auth',authRouter );
router.use('/users',userRouter );

router.all('*',(req,res,next)=>{
    res.json({data:"", mssg:"Route not found"} )
})


module.exports= router;