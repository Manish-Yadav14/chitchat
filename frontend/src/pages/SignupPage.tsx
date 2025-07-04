import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup,isSigningUp} = useAuthStore();


  const handleSignup = (e:any) => {
    e.preventDefault();
    const formData = {fullName,email,password}
    signup(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-row rounded-lg shadow-xl w-full max-w-4xl h-[500px] overflow-hidden">
        <div className="w-2/3 p-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl ml-6 font-mono font-bold mb-6 text-white">
            Join ChitChat 🗨️
          </h1>
          <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold font-mono mb-6 text-white text-center">
              Create Your Account
            </h2>

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-base font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-base font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-300 text-base font-medium mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  required
                />
              </div>

              <div>
                <button
                  disabled = {isSigningUp}
                  type="submit"
                  className="w-full flex justify-center items-center rounded-md bg-[#3440b4] px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin m-1"/>
                        Loading...
                    </>
                  ):(
                    <>
                    Create Account <ArrowRight className="ml-2" size={16} />
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-gray-400 text-md">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="font-semibold text-blue-400 hover:underline transition"
                  >
                    Login Now!
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

export default SignupPage;
