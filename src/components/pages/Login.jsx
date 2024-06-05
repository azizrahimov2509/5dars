import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login", user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/layout/products");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === `<p style={{color:"red"}}>auth/wrong-password</p>` ||
          errorCode === `<p style={{color:"red"}}>auth/user-not-found</p>`
        ) {
          setError("Incorrect email or password. Please try signing up.");
        } else {
          setError(error.message);
        }
        console.log(error.message);
      });

    setLoginData({ email: "", password: "" });
  };

  return (
    <div className="container flex justify-center items-center h-screen">
      <form
        className="max-w-[400px] flex flex-col gap-4 bg-base-100 p-10 rounded-lg shadow-lg border border-gray-300"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="input input-bordered w-full"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password..."
            className="input input-bordered w-full"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Log in
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account yet?
            <Link to="/" className="link link-primary ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
