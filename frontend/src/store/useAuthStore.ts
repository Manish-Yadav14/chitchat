import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface AuthStore {
  authUser: any | null;
  onlineUsers: any | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  checkAuth: () => Promise<void>;
  signup : (data:any) => Promise<void>;
  login :(data:any) => Promise<void>;
  logout :() => Promise<void>;
  updateProfile : (data:any)=> Promise<void>;
  socket:any | null;
  connectSocket : ()=>void;
  disconnectSocket : ()=>void;
}

export const useAuthStore = create<AuthStore>((set,get)=>({
    authUser:null,
    isCheckingAuth :true,
    isSigningUp :false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers : [],
    socket : null,

    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth",error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup : async(data: any)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data})
            toast.success("Account created Successfully");
            get().connectSocket();
        } catch (error:any) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp:false});
        }
    },

    login : async(data:any)=>{
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data})
            toast.success("Login Successfully");
            get().connectSocket();
        } catch (error:any) {
            toast.error(error.response.data.message);
        } finally{
            set({isLoggingIn:false});
        }
    },

    logout : async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logged out Successfully");
            get().disconnectSocket();
        } catch (error:any) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data})
            toast.success("Profile Updated successfully");
        } catch (error:any) {
            console.log("Error in Updating profile");
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile:false});
        }
    },

    connectSocket : ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query:{
                userId:authUser.id,
            }
        })
        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket : ()=>{
        console.log('ddd');
        if(get().socket?.connected) get().socket.disconnect();
    },

}))