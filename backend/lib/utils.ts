import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateToken = (userId:string,res:any) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({userId},secret!,{
        expiresIn : "2d",
    })

    res.cookie("jwt",token,{
        maxAge: 2*24*60*60*1000,
        httpOnly:true,
        sameSite:"none",
        secure: false
    })

    return token;
}