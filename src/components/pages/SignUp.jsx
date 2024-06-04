import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(user));
        // Navigate to Home
        navigate("/layout/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="container flex justify-center items-center h-screen bg-gray-100">
      <form
        className="max-w-[400px] flex flex-col gap-4 bg-base-100 p-10 rounded-lg shadow-xl border border-gray-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
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
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            You already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
