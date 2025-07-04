import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isLoggingIn,login} = useAuthStore()


  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {email,password};
    login(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-row rounded-lg shadow-xl w-full max-w-4xl h-[500px] overflow-hidden">
        <div className="w-2/3 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-mono font-bold mb-6 text-white">
            Welcome to ChitChat 💬
          </h1>
          <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold font-mono mb-6 text-white text-center">
              Login to your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-base font-medium mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="text-gray-300 text-base font-medium"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              <div>
                <button
                  disabled={isLoggingIn}
                  type="submit"
                  className="w-full flex justify-center items-center rounded-md bg-[#3440b4] px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"
                >
                  {isLoggingIn ? (
                     <>
                      <Loader2 className="size-5 animate-spin m-1"/>
                        Loading...
                    </>
                  ):(
                    <>
                      Login <ArrowRight className="ml-2" size={16} />
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-gray-400 text-md">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-blue-400 hover:underline transition"
                  >
                    Create a free account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default LoginPage;
