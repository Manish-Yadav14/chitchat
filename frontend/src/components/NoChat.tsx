import logoImage from "../assets/logo.jpeg";

function NoChat() {
  return (
    <section className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="flex flex-col justify-center items-center">
        <img
          className="m-2 p-2 rounded-full animate-pulse w-[130px] h-[130px]"
          src={logoImage}
          alt="logo"
        />

        <h1 className="text-white text-3xl font-mono m-2 p-2">
          Welcome to{" "}
          <span className="text-[#3440b4] font-bold">ChitChat</span>
        </h1>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>

      </div>
    </section>
  );
}

export default NoChat;
