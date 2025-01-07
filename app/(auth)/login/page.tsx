"use client";
import { useLoginMutation } from "@/app/features/auth/authApi";
import { setCredentials } from "@/app/features/auth/authSlice";
import { alert } from "@/utils/alert";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const [initLogin, { isLoading }] = useLoginMutation();
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    initLogin(formValues)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          const tokenExpiration = new Date();
          tokenExpiration.setDate(tokenExpiration.getDate() + 30); // 30 days

          dispatch(
            setCredentials({
              user: res.user,
              accessToken: res.accessToken,
              is_authenticated: true,
              tokenExpiration: tokenExpiration,
            })
          );
          alert({
            type: "success",
            message: "Login successfully",
            timer: 1000,
            cb: () => router.push("/"),
          });
        }
      })
      .catch((error) => {
        console.error(error);
        alert({
          type: "error",
          message: error.data.message || "Something went wrong",
          timer: 2000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-5 bg-white rounded shadow-md">
        <h2 className="text-2xl text-black font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              className="w-full px-3 text-gray-500  py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
                className="w-full px-3 text-gray-500 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div
                onClick={toggleShowPassword}
                className="text-sm absolute right-2 top-[30%] text-blue-500 cursor-pointer"
              >
                {showPassword ? "hide" : "show"}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full block col-span-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="text-center">
          <p className="mt-4 text-black font-medium">Or</p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
        </div>
        <div>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
