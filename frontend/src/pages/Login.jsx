import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-800">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Welcome Back
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 hover:bg-blue-800 transition-all py-4 rounded-xl text-xl font-semibold text-white"
          >
            Login
          </button>


          <p className="text-gray-400 text-center mt-6">
  Don't have an account?
  <span
    onClick={() => navigate("/register")}
    className="text-blue-500 cursor-pointer ml-2"
  >
    Sign Up
  </span>
</p>

        </div>

      </div>

    </div>
  );
}

export default Login;