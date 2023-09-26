const {verifyJWT}= require('./jwt')

const secureAPI=(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token) throw new Error('acces token require')
    const accesToken = token.split('Bearer ')[1];
const isValidToken = verifyJWT(accesToken);
console.log(isValidToken);

next();
};

module.exports= secureAPI;