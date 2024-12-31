"use client";
import { useRegisterMutation } from "@/app/features/auth/authApi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [initRegister, { isLoading }] = useRegisterMutation();
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
    initRegister(formValues)
      .unwrap()
      .then((res) => {
        console.log(res);
        router.push("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-5 bg-white rounded shadow-md">
        <h2 className="text-2xl text-black font-bold text-center">Register</h2>
        {!session ? (
          <>
            <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 text-gray-500  border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2  text-gray-500  mt-1 border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
                {isLoading ? "Loading..." : "Register"}
              </button>
            </form>
            <div className="text-center">
              <p className=" text-black font-medium">Or</p>
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Sign in with Google
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center">Signed in as {session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
