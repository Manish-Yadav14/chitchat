import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../lib/db';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const protectRoute = async(req:any,res:any,next:any)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token provided"})
        }
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token,secret!) as CustomJwtPayload;

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"})
        }

        const user = await prisma.user.findFirst({
            where:{id:decoded.userId},
            select:{
                id:true,
                fullName:true,
                email:true,
                profilePic:true,
                createdAt:true,
                updatedAt:true,
            }
        })

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}