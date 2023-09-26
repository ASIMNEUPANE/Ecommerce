const {verifyJWT}= require('./jwt')

const compareRole = (requireRole,userRole)=>{
    if(requireRole.length<1)return true;
    return userRole.some((v)=> requireRole.indexOf(v)!== -1);



};

const secureAPI=(roles )=>{

return async (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token) throw new Error('acces token require')
    const accesToken = token.split('Bearer ')[1];
const {data} = verifyJWT(accesToken);
if (!data) throw new Error('Data is not availabe')
const {roles:userRole,email}= data;
// check if the user has required role or not
// compare role against secureAPI passed role
const isValidRole=  compareRole(roles ?? [],userRole)
if(!isValidRole) throw new Error('user unathorized')
next();
};
}
module.exports= secureAPI;