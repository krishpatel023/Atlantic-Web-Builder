import Image from "next/image";
import DemoImage_1 from "@/assets/DemoImage_1.jpg";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  Copyright,
  ArrowFatRight,
} from "@phosphor-icons/react/dist/ssr";
import { ReactElement } from "react";

export default function Hero_1() {
  return (
    <>
      <div className="flex h-[40rem] w-full items-center justify-center bg-aui_primary">
        <div className="flex h-full w-[60%] flex-col items-start justify-center gap-6 px-16">
          <h1 className="text-4xl font-bold text-aui_text">
            Welcome to the world of Atlantic UI
          </h1>
          <h2 className="text-lg font-medium text-aui_text_secondary">
            One stop destination to build Tailwind styled components instantly.
            A Developer first model that provides the root customizability to
            cater all your needs.
          </h2>
          <button className="h-12 w-40 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
            Explore Now
          </button>
        </div>
        <div className="flex h-full w-[40%] items-center justify-center">
          <Image
            src={DemoImage_1}
            alt="Demo"
            className="h-[70%] w-[90%] rounded-3xl object-contain"
          />
        </div>
      </div>
    </>
  );
}

export const HeroElement_1: ReactElement = (
  <div className="flex h-[40rem] w-full items-center justify-center bg-aui_primary">
    <div className="flex h-full w-[60%] flex-col items-start justify-center gap-6 px-16">
      <h1 className="text-4xl font-bold text-aui_text">
        Welcome to the world of Atlantic UI
      </h1>
      <h2 className="text-lg font-medium text-aui_text_secondary">
        One stop destination to build Tailwind styled components instantly. A
        Developer first model that provides the root customizability to cater
        all your needs.
      </h2>
      <button className="h-12 w-40 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
        Explore Now
      </button>
    </div>
    <div className="flex h-full w-[40%] items-center justify-center">
      <img
        src="https://s.cafebazaar.ir/images/upload/screenshot/com.izanaki.itachi.blackwallpapers-screenshots-2.jpg"
        alt="Demo"
        className="w-[16rem] rounded-3xl object-contain"
      />
    </div>
  </div>
);

export const HeroCode_1 = `<div className="w-full h-[40rem] bg-aui_primary flex items-center justify-center">
<div className="w-[60%] h-full flex flex-col justify-center items-start gap-6 px-16">
  <h1 className="font-bold text-4xl text-aui_text">
    Welcome to the world of Atlantic UI
  </h1>
  <h2 className="font-medium text-lg text-aui_text_secondary">
    One stop destination to build Tailwind styled components instantly.
    A Developer first model that provides the root customizability to
    cater all your needs.
  </h2>
  <button className="w-40 h-12 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
    Explore Now
  </button>
</div>
<div className="w-[40%] h-full flex justify-center items-center">
  <Image
    src={DemoImage_1}
    alt="Demo"
    className="w-[90%] h-[70%] object-contain rounded-3xl"
  />
</div>
</div>`;
