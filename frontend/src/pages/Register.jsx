import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      const res = await axios.post(
        "https://task-manager-app-33k8.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-gray-900 p-10 rounded-3xl shadow-2xl border border-gray-800">

        <h1 className="text-5xl font-bold text-white text-center mb-10">
          Create Account
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-green-500"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-green-500"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white text-lg outline-none focus:border-green-500"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-green-700 hover:bg-green-800 transition-all py-4 rounded-2xl text-xl font-semibold text-white"
          >
            Sign Up
          </button>

          <p className="text-gray-400 text-center mt-6">

            Already have an account?

            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer ml-2"
            >
              Login
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;