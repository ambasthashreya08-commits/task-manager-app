import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://task-manager-app-33k8.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md border border-gray-700">

        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-black text-white border border-gray-700 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-black text-white border border-gray-700 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Login
          </button>

          <p className="text-gray-400 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400">
              Signup
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;