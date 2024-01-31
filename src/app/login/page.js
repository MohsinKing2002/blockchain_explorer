"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formvalue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, formvalue.email, formvalue.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        let fb_user = {
          name: user.displayName,
          email: user.email,
          accessToken: user.accessToken,
        };
        localStorage.setItem("fb_user", JSON.stringify(fb_user));
        router.push("/");
      })
      .catch((error) => {
        console.log("login err", error);
        // ..
      });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" w-11/12 md:basis-2/5 p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={formvalue.email}
              onChange={(e) =>
                setFormValue((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              placeholder="password"
              value={formvalue.password}
              onChange={(e) =>
                setFormValue((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            onClick={handleLogin}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
