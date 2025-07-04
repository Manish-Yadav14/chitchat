import { Navigate, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
// import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  console.log({onlineUsers});
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser) 
    return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
  )
  return (
    <>
      <div>
        <Navbar/>

        <Routes>
          <Route path = "/" element={authUser ? <Homepage/>: <Navigate to="/login" />}/>
          <Route path = "/login" element={!authUser ?  <LoginPage/>: <Navigate to="/" />}/>
          <Route path = "/signup" element={!authUser ? <SignupPage/> : <Navigate to="/" />}/>
          {/* <Route path = "/settings" element={<SettingsPage/>}/> */}
          <Route path = "/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/> }/>
        </Routes>

        <Toaster/>
      </div>
    </>
  )
}

export default App
