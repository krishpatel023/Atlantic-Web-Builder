"use client";

import Image from "next/image";
import Github from "@/assets/Github.svg";
import Google from "@/assets/Google.svg";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import { v4 } from "uuid";
import { useUser } from "@/context/UserData/UserProvider";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { userState, dispatchUserState } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState<string | null>();
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const [password, setPassword] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [name, setName] = useState<string | null>();
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    if (userState.loginStatus) {
      router.push("/");
    }
  }, []);
  const handleNameChange = (name: string) => {
    setNameError(null);

    var validRegex: RegExp = new RegExp(/[a-zA-Z]/g);
    var validRegex_space: RegExp = new RegExp(/[\s]/g);
    if (name === undefined || name === "") {
      setNameError("Name must not be empty");
    }
    if (name.match(validRegex) && !name.match(validRegex)) {
      setNameError("Name must not be empty");
    }
    if (!name.match(validRegex)) {
      setNameError("Please enter a valid name");
    } else setName(name);
  };
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
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
          "be atleat 8 characters",
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
          "contain an uppercase character",
        );
        errCount++;
      }
      if (!email.match(validRegex_lowercase)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a lowercase character",
        );
        errCount++;
      }
      if (!email.match(validRegex_numeric)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", ",");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a numeric character",
        );
        errCount++;
      }
      if (!email.match(validRegex_special)) {
        if (errCount > 0) {
          passwordErrorMsg = passwordErrorMsg.concat(" ", "and");
        }
        passwordErrorMsg = passwordErrorMsg.concat(
          " ",
          "contain a special character like (@,%,$,etc.).",
        );
        errCount++;
      }

      setPasswordError(passwordErrorMsg);
    }
  };

  //SignIn
  const handleSignUp = () => {
    if (
      !usernameError &&
      !passwordError &&
      !nameError &&
      name &&
      username &&
      password
    ) {
      handleSignUpLogic();
    } else {
      if (!password) {
        setPasswordError("Please enter a valid Password");
      }
      if (!username) {
        setUsernameError("Please enter a valid Email");
      }
      if (!name) {
        setNameError("Please enter a valid Name");
      }
    }
  };

  //SIGNUP LOGIC
  const handleSignUpLogic = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/users/register`,
      {
        userID: v4(),
        name: name,
        email: username,
        password: password,
        projects: [],
      },
      HEADER_CONFIG,
    );

    if (response.data.status === true) {
      const resp = dispatchUserState({
        type: "LOGIN",
        payload: { data: response.data.data },
      });
      console.log(resp);

      router.push("/dashboard");
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full w-[40%] flex-col items-center justify-center bg-[url('../assets/Background.svg')] bg-contain bg-center bg-no-repeat">
        <div className="flex w-3/4 flex-col gap-4">
          <h1 className="text-5xl font-bold text-textPrimary">Welcome</h1>
          <span className="text-2xl font-normal text-textPrimary">
            Sign up to start creating your dream website. A low code kickstart
            to develop your websites faster.
          </span>
        </div>
      </div>
      <div className="flex h-full w-[60%] items-center justify-center">
        <div className="w-[50%]">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="name" className="text-lg text-textPrimary">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className={clsx(
                "block h-12 w-full rounded-md border-2 px-4 shadow-sm",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    nameError !== null,
                  "focus:ring-primary-200 focus:ring focus:ring-opacity-50":
                    nameError === null,
                },
              )}
              onChange={(e) => {
                handleNameChange(e.target.value);
              }}
            />
            {nameError !== null ? (
              <span className="text-sm font-normal text-red-600">
                {nameError}
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            <label htmlFor="username" className="text-lg text-textPrimary">
              Email
            </label>
            <input
              type="text"
              placeholder="you@email.com"
              className={clsx(
                "block h-12 w-full rounded-md border-2 px-4 shadow-sm",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    usernameError !== null,
                  "focus:ring-primary-200 focus:ring focus:ring-opacity-50":
                    usernameError === null,
                },
              )}
              onChange={(e) => {
                handleUsernameChange(e.target.value);
              }}
            />
            {usernameError !== null ? (
              <span className="text-sm font-normal text-red-600">
                {usernameError}
              </span>
            ) : null}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            <label htmlFor="password" className="text-lg text-textPrimary">
              Password
            </label>
            <input
              type="Password"
              placeholder="Password"
              className={clsx(
                "block h-12 w-full rounded-md border-2 px-4 shadow-sm",
                {
                  "border-red-600 focus:border-red-600 focus:ring focus:ring-red-600 focus:ring-opacity-50":
                    passwordError !== null,
                  "focus:ring-primary-200 focus:ring focus:ring-opacity-50":
                    passwordError === null,
                },
              )}
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
            />
            {passwordError !== null ? (
              <span className="text-sm font-normal text-red-600">
                {passwordError}
              </span>
            ) : null}
          </div>
          {/* <div className="mt-4 flex gap-2">
            <input type="checkbox" name="" id="" />
            <span>Remember me</span>
          </div> */}
          <div className="mt-6 flex flex-col gap-4">
            <button
              className="flex h-12 w-full items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover "
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <p>
              Have an account?{" "}
              <Link href={"/signin"} className="text-accent underline">
                Sign In
              </Link>
            </p>
          </div>

          <div className="width-full mt-10 flex items-center justify-between">
            <div className="min-h-[1px] w-[43%] bg-gray-200"></div>
            <span className="text-sm font-medium text-textSecondary">OR</span>
            <div className="min-h-[1px] w-[43%] bg-gray-200"></div>
          </div>

          <div className="width-full mt-10 flex items-center justify-center gap-6">
            <button className="rounded-sm border-[1px] border-border p-2">
              <Image className="h-8 w-8" src={Google} alt="" />
            </button>
            <button className="rounded-sm border-[1px] border-border p-2">
              <Image className="h-8 w-8" src={Github} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
