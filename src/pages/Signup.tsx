import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

const signupSchema = z.object({
  userId: z.string().min(3, "User ID is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  confirmPassword: z.string().min(4, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data: SignupForm) => {
    const users = JSON.parse(localStorage.getItem("sz_users") || "[]");
    if (users.find((u: any) => u.userId === data.userId)) {
      setError("userId", { message: "User ID already exists" });
      return;
    }
    users.push({ userId: data.userId, password: data.password });
    localStorage.setItem("sz_users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Sign Up for SwasthZenith</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              {...register("userId")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              autoComplete="username"
            />
            {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-700 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
} 