import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes'
import messageRoutes from './routes/message.routes'
import cors from 'cors';
import {app,server} from  './lib/socket';

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use(cookieParser());
app.use(cors({
    origin:"*",
    credentials:true,   
}));

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT,()=>{
    console.log(`Server is listening on Port ${PORT}...`);
})
