export const formatMessageTime = (timestamp:any)=>{
    return new Date(timestamp).toLocaleTimeString("en-IN",{
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
    })
}