import "dotenv/config"
import prisma from "../lib/db";
import cloudinary from "../lib/cloudinary";
import { getReceiverSocketId, io } from "../lib/socket";

export const getUsers = async(req:any,res:any)=>{
    try {
        const loggedInUserId = req.user.id;
        const filteredUsers = await prisma.user.findMany({
            where:{
                NOT:{
                    id:loggedInUserId,
                },
            },
            select:{
                id:true,
                fullName:true,
                email:true,
                profilePic:true,
                createdAt:true,
                updatedAt:true,
            }
        });

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUser controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getMessages = async(req:any,res:any)=>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user.id;
        const messages = await prisma.message.findMany({
            where:{
                senderId : {
                    in: [myId,userToChatId],
                },
                receiverId:{
                    in : [myId,userToChatId],
                }
            }
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const sendMessage = async(req:any,res:any)=>{
    try {
        const {id:receiverId} = req.params;
        const {text,image} = req.body;
        const senderId = req.user.id;

        let imageURL:string = "";

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        const msgResponse = await prisma.message.create({data:{senderId,receiverId,text,image:imageURL}})

        const receiverSocketId =  getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", msgResponse);
        }
         
        res.status(201).json(msgResponse);
    } catch (error) {
        console.log("Error in sendMessage controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
