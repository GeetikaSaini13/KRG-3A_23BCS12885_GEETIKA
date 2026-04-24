import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { toast, ToastContainer } from "react-toastify";

function Login({ isLogin, handleLogin }) {
  const [createPage, setCreatePage] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  // Login Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // alert("Login Successful!");
      toast.success("Login Successful!");
      dispatch(authActions.login());
      navigate("/");
      handleLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create Account Handler
  const handleCreateAccountSubmit = async () => {
    if (!value.username || !value.email || !value.password) {
      // setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/v1/signup", {
        method: "POST",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: value.username,
          email: value.email,
          password: value.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Account creation failed");
      }

      // alert("Account Created Successfully!");
      toast.success("Account Created Successfully!");
      setCreatePage(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Handlers
  const handleCreateToggle = () => {
    setError("");
    setCreatePage((prev) => !prev);
  };

  const handleForgotPasswordToggle = () => {
    setError("");
    setForgotPassword((prev) => !prev);
  };

  return (
    <>
      {isLogin && (
        <div className="fixed h-screen inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleLogin}
            >
              ✕
            </button>

            {!createPage && !forgotPassword && (
              <>
                {/* Login Form */}
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                  Sign in to your account
                </h2>

                <button className="w-full flex items-center justify-center text-gray-700 border border-gray-300 rounded-lg py-2 mb-4 hover:bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.35 11.1h-9.34v2.53h6.45c-.58 2.23-2.45 3.8-4.61 3.8-2.72 0-4.94-2.2-4.94-4.92 0-2.71 2.22-4.93 4.94-4.93 1.17 0 2.26.42 3.12 1.13l1.81-1.82C15.95 5.3 14.52 4.7 13 4.7c-4.34 0-7.87 3.53-7.87 7.87 0 4.33 3.53 7.86 7.87 7.86 4.1 0 7.53-3.15 7.86-7.27h-7.87z"></path>
                  </svg>
                  Sign in with Google
                </button>

                <div className="text-center text-sm text-gray-500 mb-4">or</div>

                <input
                  type="email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                />

                <div className="text-right mb-4">
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={handleForgotPasswordToggle}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleLoginSubmit}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Don’t have an account?{" "}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handleCreateToggle}
                  >
                    Create Account
                  </button>
                </p>
              </>
            )}

            {createPage && (
              <>
                {/* Create Account Form */}
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                  Create your account
                </h2>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={value.username}
                  onChange={(e) =>
                    setValue({ ...value, username: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                />

                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4"
                  onClick={handleCreateAccountSubmit}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handleCreateToggle}
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}

            {forgotPassword && (
              <>
                {/* Forgot Password Form */}
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                  Forgot Password?
                </h2>

                <p className="text-sm text-center text-gray-600 mb-4">
                  Enter your email to reset your password.
                </p>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                />

                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4">
                  Reset Password
                </button>

                <p className="text-center text-sm text-gray-600">
                  Remembered your password?{" "}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={handleForgotPasswordToggle}
                  >
                    Back to Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
    </>
  );
}

export default Login;
