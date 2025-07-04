import ChatContainer from "../components/ChatContainer";
import NoChat from "../components/NoChat";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const Homepage = () => {
  const {selectedUser} = useChatStore();
  
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-8xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChat/> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage