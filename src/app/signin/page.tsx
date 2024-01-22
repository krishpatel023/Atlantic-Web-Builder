"use client";

import Image from "next/image";
import Github from "@/assets/Github.svg";
import Google from "@/assets/Google.svg";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function SignIn() {
  const [username, setUsername] = useState<string | null>();
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [password, setPassword] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>(null);

  //EMAIL VALIDATION ALONG WITH STORING
  const handleUsernameChange = (val: string) => {
    setUsernameError(null);
    if (val === "" || val === undefined) {
      setUsernameError("Please enter a valid Email");
    } else setUsername(val);

    const isValid: Boolean = validateEmail(val);
    if (isValid === false) setUsernameError("Please enter a valid Email");
  };

  const validateEmail = (email: string) => {
    var validRegex: RegExp = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  //PASSWORD VALIDATION ALONG WITH STORING
  const handlePasswordChange = (val: string) => {
    setPasswordError(null);
    setPassword(val);
    validatePassword(val);
  };

  const validatePassword = (email: string) => {
    //Uppercase
    var validRegex_uppercase = new RegExp(/[A-Z]/g);
    //Lowercase
    var validRegex_lowercase = new RegExp(/[a-z]/g);
    //Numeric
    var validRegex_numeric = new RegExp(/[0-9]/g);
    //Special Characters
    var validRegex_special = new RegExp(/[~!@#$%^*\-_=+[{\]}\/;:,.?]/g);

    //Space
    var validRegex_space = new RegExp(/[\s]/g);
    if (
      email.length >= 8 &&
      email.match(validRegex_uppercase) &&
      email.match(validRegex_lowercase) &&
      email.match(validRegex_numeric) &&
      email.match(validRegex_special) &&
      !email.match(validRegex_space)
    ) {
      setPasswordError(null);
    } else {
      var passwordErrorMsg: string = "Password must";
      var errCount: number = 0;

      if (email.length < 8) {
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "be atleat 8 characters"
        );
        console.log(passwordErrorMsg);

        errCount++;
      }
      if (email.match(validRegex_space)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(" ", "not contain a space");
        errCount++;
      }

      if (!email.match(validRegex_uppercase)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain an uppercase character"
        );
        errCount++;
      }
      if (!email.match(validRegex_lowercase)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a lowercase character"
        );
        errCount++;
      }
      if (!email.match(validRegex_numeric)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a numeric character"
        );
        errCount++;
      }
      if (!email.match(validRegex_special)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", "and");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a special character like (@,%,$,etc.)."
        );
        errCount++;
      }

      setPasswordError(passwordErrorMsg);
    }
  };

  //SignIn
  const handleSignIn = () => {
    if (!usernameError && !passwordError && username && password) {
      //Remove this
      alert("Signed In");
    } else {
      if (!password) {
        setPasswordError("Please enter a valid Password");
      }
      if (!username) {
        setUsernameError("Please enter a valid Email");
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[40%] h-full flex flex-col justify-center items-center bg-[url('../assets/Background.svg')] bg-center bg-no-repeat bg-contain">
        <div className="w-3/4 flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-textPrimary">Welcome Back</h1>
          <span className="text-2xl font-normal text-textPrimary">
            Sign in to start creating your dream website. A low code kickstart
            to develop your websites faster.
          </span>
        </div>
      </div>
      <div className="w-[60%] h-full flex justify-center items-center">
        <div className="w-[50%]">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username" className="text-lg text-textPrimary">
              Email
            </label>
            <input
              type="text"
              placeholder="you@email.com"
              className={clsx(
                "block w-full h-12 rounded-md border-2 shadow-sm px-4",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    usernameError !== null,
                  "focus:ring focus:ring-primary-200 focus:ring-opacity-50":
                    usernameError === null,
                }
              )}
              onChange={(e) => {
                handleUsernameChange(e.target.value);
              }}
            />
            {usernameError !== null ? (
              <span className="text-red-600 text-sm font-normal">
                {usernameError}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 w-full mt-6">
            <label htmlFor="password" className="text-lg text-textPrimary">
              Password
            </label>
            <input
              type="Password"
              placeholder="Password"
              className={clsx(
                "block w-full h-12 rounded-md border-2 shadow-sm px-4",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    passwordError !== null,
                  "focus:ring focus:ring-primary-200 focus:ring-opacity-50":
                    passwordError === null,
                }
              )}
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
            />
            {passwordError !== null ? (
              <span className="text-red-600 text-sm font-normal">
                {passwordError}
              </span>
            ) : null}
          </div>
          <div className="mt-4 flex gap-2">
            <input type="checkbox" name="" id="" />
            <span>Remember me</span>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <button
              className="w-full h-12 rounded-md bg-primary hover:bg-primaryHover text-textComplementary text-center flex justify-center items-center "
              onClick={handleSignIn}
            >
              Sign In
            </button>

            <span className="text-accent underline">Forget Password?</span>
            <p>
              Don't have an account?{" "}
              <Link href={"/signup"} className="text-accent underline">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="flex justify-between items-center width-full mt-10">
            <div className="min-h-[1px] bg-gray-200 w-[43%]"></div>
            <span className="text-sm font-medium text-textSecondary">OR</span>
            <div className="min-h-[1px] bg-gray-200 w-[43%]"></div>
          </div>

          <div className="flex justify-center items-center width-full mt-10 gap-6">
            <button className="border-[1px] rounded-sm border-border p-2">
              <Image className="w-8 h-8" src={Google} alt="" />
            </button>
            <button className="border-[1px] rounded-sm border-border p-2">
              <Image className="w-8 h-8" src={Github} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
