import "dotenv/config";
import prisma from '../lib/db';
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils";
import cloudinary from '../lib/cloudinary'

export const signup = async (req:any,res:any)=>{
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({message:"Fill all the required fields"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 Characters long"});
        }

        const user = await prisma.user.findFirst({where:{email}});

        if(user) return res.status(400).json({message:"User with this email already exists"});

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await prisma.user.create({data:{fullName,email,password:hashedPassword}});

        if(newUser){
            generateToken(newUser.id,res);
            res.status(201).json({
                id : newUser.id,
                fullName:newUser.fullName,
                email : newUser.email,
                createdAt : newUser.createdAt,
                profilePic : newUser.profilePic,
            })
        }
        else {
            res.status(400).json({message:"Invalid User data"})
        }
    } catch (error:any) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async (req:any,res:any)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({message:"Fill all the required fields"});
        }
        const user = await prisma.user.findFirst({where:{email}});
        if(!user) return res.status(400).json({message:"User not found"});

        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({message:'Invalid Credentials'});
        }

        generateToken(user.id,res);
        res.status(201).json({
            id : user.id,
            fullName:user.fullName,
            email : user.email,
            createdAt : user.createdAt,
            profilePic :user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller: ",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = async (req:any,res:any)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({message:"Logged Out Successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateProfile = async(req:any,res:any)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user.id;

        if(!profilePic){
            return res.status(400).json({message:"Profile Pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic,{
            folder:'profile_pics',
        });
        const updatedUser = await prisma.user.update({where:{id:userId},data:{profilePic:uploadResponse.secure_url}});

        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log("Error in update profile",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const checkAuth = async(req:any,res:any)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        console.log("Error in checking auth :",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}