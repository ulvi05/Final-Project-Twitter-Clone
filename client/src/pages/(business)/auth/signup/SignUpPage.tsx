import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import XSvg from "../../../../components/svgs/X";
import {
  MdOutlineMail,
  MdPassword,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

type FormData = {
  email: string;
  username: string;
  fullName: string;
  password: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen max-w-screen-xl px-10 mx-auto">
      <div className="items-center justify-center flex-1 hidden lg:flex">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <form
          className="flex flex-col gap-4 mx-auto lg:w-2/3 md:mx-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <XSvg className="w-24 lg:hidden fill-white" />

          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>

          {/* Email */}
          <label className="flex items-center gap-2 rounded input input-bordered">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </label>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Username & Full Name */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center flex-1 gap-2 rounded input input-bordered">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
              />
            </label>
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}

            <label className="flex items-center flex-1 gap-2 rounded input input-bordered">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                {...register("fullName", { required: "Full Name is required" })}
              />
            </label>
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Password */}
          <label className="flex items-center gap-2 rounded input input-bordered">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <button className="text-white rounded-full btn btn-primary">
            Sign up
          </button>
        </form>

        {/* Already have an account */}
        <div className="flex flex-col gap-2 mt-4 lg:w-2/3">
          <p className="text-lg text-white">Already have an account?</p>
          <Link to="/login">
            <button className="w-full text-white rounded-full btn btn-primary btn-outline">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
