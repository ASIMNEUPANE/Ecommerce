require('dotenv').config()
const {totp}= require('otplib')

totp.options= {digits:6, step: +process.env.OTP_DURATION}


const generateOTP = ()=>{
    totp.options= {digits:6, step:30}

return totp.generate(process.env.OTP_SECRET);

}

const verifyOTP = async(token)=>{
    totp.options= {digits:6, step: 30}

    return totp.check(token, process.env.OTP_SECRET )
}

module.exports= {generateOTP,verifyOTP}