import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

const loginSchema = z.object({
  emailOrMobile: z.string().min(1, "Email or mobile number is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("sz_users") || "[]");
      
      // Check if user exists by email or mobile number
      const user = users.find((u: any) => 
        (u.email === data.emailOrMobile || u.mobileNumber === data.emailOrMobile) && 
        u.password === data.password
      );
      
      if (user) {
        localStorage.setItem("sz_logged_in", JSON.stringify(user));
        setIsLoading(false);
        navigate("/dashboard");
      } else {
        setError("emailOrMobile", { message: "Invalid email/mobile or password" });
        setError("password", { message: "Invalid email/mobile or password" });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your SwasthZenith account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email or Mobile Number</label>
            <input
              type="text"
              {...register("emailOrMobile")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your email or mobile number"
              autoComplete="username"
            />
            {errors.emailOrMobile && <p className="text-red-500 text-sm mt-1">{errors.emailOrMobile.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/trial-signup" className="text-teal-600 hover:underline font-medium">
              Start Free Trial
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">🌟 New to SwasthZenith?</h3>
          <p className="text-sm text-green-800 mb-3">
            Start your 14-day free trial and get access to personalized wellness programs.
          </p>
          <Link
            to="/trial-signup"
            className="inline-block w-full text-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
} 