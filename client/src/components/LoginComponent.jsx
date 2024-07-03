/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Logo, Button, Input } from "./index";
import { login } from "../store/authSlice";
import authService from "../services/auth.service";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginComponent = () => {
  const location = useLocation();
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.status);
  const { register, handleSubmit } = useForm();
  const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || "/";
      const data = location.state?.data || null;
      if (data) {
        navigate(from, { state: { data } });
      } else {
        navigate(from);
      }
    }
  }, [isAuthenticated, location.state, navigate]);

  const handleDemoLogin = async () => {
    try {
      const session = await authService.loginUser({
        email: demoEmail,
        password: demoPassword,
      });
      if (session) {
        const userData = await authService.currentUser();
        if (userData) {
          dispatch(login({ userData }));
        }
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const handleLogin = async (data) => {
    setErrors("");
    try {
      const session = await authService.loginUser(data);
      if (session) {
        const userData = await authService.currentUser();
        if (userData) {
          dispatch(login({ userData }));
        }
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-3">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center ">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold text-[#301E08] leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <div>
              <Button
                type="submit"
                className="w-full  font-semibold px-10 py-5 rounded-2xl  text-xl"
              >
                Sign in
              </Button>
              <p className="text-center text-[#301E08] text-xl my-2 ">or</p>
              <Button
                className=" w-full font-semibold  py-5 rounded-2xl my-1 text-xl "
                onClick={handleDemoLogin}
              >
                Login with Demo Credentials
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
