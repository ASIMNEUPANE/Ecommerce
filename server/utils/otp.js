const {totp}= require('otplib')

totp.options= {digits:6, step: +process.env.OTP_DURATION}


const generateOTP = ()=>{

return totp.generate(process.env.OTP_SECRET);

}

const verifyOTP = async(token)=>{
    return totp.verify({token, secret:process.env.OTP_SECRET} )
}

module.exports= {generateOTP,verifyOTP}