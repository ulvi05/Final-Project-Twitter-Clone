import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { MdOutlineMail, MdPassword } from "react-icons/md";
import XSvg from "@/components/svgs/X";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be at most 15 characters")
    .regex(/^[a-z]+$/, "Username must only contain lowercase letters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

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
                type="text"
                className="grow"
                placeholder="Username"
                {...register("username")}
              />
            </div>
            {errors.username && (
              <span className="mt-1 text-xs text-red-500">
                {errors.username.message}
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

          <button
            type="submit"
            className="text-white rounded-full btn btn-primary"
          >
            Log in
          </button>
        </form>

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
