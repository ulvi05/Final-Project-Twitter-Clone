import { useForm, FieldError } from "react-hook-form";
import { Link } from "react-router-dom";

import XSvg from "../../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen max-w-screen-xl px-10 mx-auto">
      <div className="items-center justify-center flex-1 hidden lg:flex">
        <XSvg className=" lg:w-2/3 fill-white" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <form
          className="flex flex-col gap-4 mx-auto lg:w-2/3 md:mx-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-[#E7E9EA] font-extrabold text-3xl lg:text-6xl mt-5 mb-5">
            Happening now
          </h1>
          <h1 className="text-3xl font-extrabold text-[#E7E9EA]">
            Join today.
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded input input-bordered">
              <MdOutlineMail />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500">
                {(errors.email as FieldError).message}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 rounded input input-bordered">
                <FaUser />
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-z]+$/,
                      message: "Username must only contain lowercase letters",
                    },
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500">
                  {(errors.username as FieldError).message}
                </p>
              )}

              <div className="flex items-center gap-2 rounded input input-bordered">
                <MdDriveFileRenameOutline />
                <input
                  type="text"
                  className="grow"
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: "Full name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Full name must only contain letters",
                    },
                  })}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500">
                  {(errors.fullName as FieldError).message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 rounded input input-bordered">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">
                {(errors.password as FieldError).message}
              </p>
            )}

            <button className="text-white rounded-full btn btn-primary">
              Sign up
            </button>
          </div>
        </form>
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
