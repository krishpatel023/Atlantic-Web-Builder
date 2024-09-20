"use client";
import Image from "next/image";
import Link from "next/link";
import Github from "@/assets/Github.svg";
import Logo from "../assets/logo.png";
import { useUser } from "@/context/UserData/UserProvider";

const Header = () => {
  const { userState, dispatchUserState } = useUser();

  const handleLogout = () => {
    dispatchUserState({
      type: "LOGOUT",
    });
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border-b-[1px] border-border bg-background px-6 md:px-12">
      <div className="flex h-full w-[10rem] items-center justify-center">
        <Link href="/" className="flex h-full items-center justify-center">
          <Image src={Logo} alt="Logo" className="h-[50%] object-contain" />
        </Link>
      </div>
      <div className="flex h-full items-center gap-8">
        <div className="hidden sm:block">
          <Link
            href="https://github.com/krishpatel023/Atlantic-UI"
            target="_blank"
          >
            <Image src={Github} alt="Github Image" />
          </Link>
        </div>
        {userState?.loginStatus ? (
          <button
            className="flex h-8 w-20 items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/signin"
            className="flex h-8 w-20 items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
