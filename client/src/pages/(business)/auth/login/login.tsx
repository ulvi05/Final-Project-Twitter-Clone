import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { MdOutlineMail, MdPassword } from "react-icons/md";
import XSvg from "@/components/svgs/X";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AuthResponseType } from "@/services/auth/types";
import { useAppDispatch, useAppSelector } from "@/hooks/main";
import {
  getCurrentUserAsync,
  selectUserData,
} from "@/store/features/userSlice";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(3, "Email must be at least 3 characters")
    .max(50, "Email must be at most 50 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUserData);
  const [isGooglePending, setIsGooglePending] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      console.log("Login successful, navigating to home...");
      toast.success(response.data.message);
      dispatch(getCurrentUserAsync());
      reset();
    },
    onError: (error: AxiosError<AuthResponseType>) => {
      const message =
        error.response?.data.message ??
        "Something went wrong! Please try again";
      toast.error(message);
    },
  });

  const { mutate: googleLogin } = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (response) => {
      toast.success(response.data.message);
      dispatch(getCurrentUserAsync()).then(() => {
        navigate("/profile");
      });
    },
    onError: (error: AxiosError<AuthResponseType>) => {
      setIsGooglePending(false);
      const message = error.response?.data.message ?? "Google login failed!";
      toast.error(message);
    },
  });

  const onGoogleSuccess = ({ credential }: any) => {
    setIsGooglePending(true);
    googleLogin({ token: credential });
  };

  const onSubmit = (data: LoginFormData) => {
    console.log("Form data:", data);
    mutate(data);
  };

  console.log("Google Client ID:", import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);
  console.log("Current Origin:", window.location.origin);

  return (
    <div className="flex h-screen max-w-screen-xl mx-auto">
      <div className="items-center justify-center flex-1 hidden lg:flex">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-3xl font-bold text-white">{"Let's "} go.</h1>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 rounded input input-bordered">
              <MdOutlineMail />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 rounded input input-bordered">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="text-center">
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="text-white rounded-full btn btn-primary"
            disabled={isPending}
          >
            Log in
          </button>
        </form>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google Login Success", credentialResponse);
              onGoogleSuccess(credentialResponse);
            }}
            onError={() => {
              console.log("Google Login Failed");
              toast.error("Google login failed.");
            }}
          />

          {isGooglePending && (
            <p className="mt-2 text-sm text-white">Logging in with Google...</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-lg text-white">Don't have an account?</p>
          <Link to="/signup">
            <button className="w-full text-white rounded-full btn btn-primary btn-outline">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
