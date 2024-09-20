"use client";

import { useUser } from "@/context/UserData/UserProvider";
import Link from "next/link";
import HeroImg from "@/assets/heroImg.png";
import Image from "next/image";

export default function Hero() {
  const { userState } = useUser();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-10 bg-[url('../assets/Background.svg')]	bg-center bg-no-repeat px-8 py-20 text-center">
      <h1 className=" text-5xl font-bold text-textPrimary">
        A website builder for developers
      </h1>
      <span className="text-2xl font-medium text-textSecondary">
        One stop destination to build Tailwind styled components instantly.
        Login to get started.
      </span>
      <Link
        className="flex h-10 w-32 items-center justify-center rounded-md bg-primary text-center text-textComplementary hover:bg-primaryHover "
        href={userState?.loginStatus ? "/dashboard" : "/signin"}
      >
        Get Started
      </Link>

      <div className="hidden w-3/4 overflow-hidden rounded-xl border border-neutral-300 bg-neutral-500/10 p-4 md:block">
        <div className="overflow-hidden rounded-xl border border-neutral-300 shadow-lg">
          <Image src={HeroImg} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
}
