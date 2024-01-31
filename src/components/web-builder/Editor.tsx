"use client";
import {
  Desktop,
  DeviceMobileCamera,
  DeviceTablet,
  Laptop,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useState } from "react";

export default function Editor({ sidebarActive }: { sidebarActive: boolean }) {
  const [active, setActive] = useState<"sm" | "md" | "lg">("sm");

  const handleChangeScreen = (screen: "sm" | "md" | "lg") => {
    setActive(screen);
  };
  return (
    <>
      <div
        className={clsx(
          " bg-secondary flex flex-col items-center transition-all duration-500",
          { "w-[calc(100vw-24rem)]": sidebarActive === false },
          { "w-[calc(100vw-38rem)]": sidebarActive === true }
        )}
      >
        <div className="h-12 flex items-center gap-4 bg-background rounded-lg px-4 py-2 mt-2">
          <button
            onClick={() => {
              handleChangeScreen("sm");
            }}
            className={clsx(
              "h-8 w-8 flex justify-center items-center text-center rounded",
              { "bg-primary text-textComplementary": active === "sm" }
            )}
          >
            <DeviceMobileCamera size={24} />
          </button>
          <button
            onClick={() => {
              handleChangeScreen("md");
            }}
            className={clsx(
              "h-8 w-8 flex justify-center items-center text-center rounded",
              { "bg-primary text-textComplementary": active === "md" }
            )}
          >
            <DeviceTablet size={24} />
          </button>
          <button
            onClick={() => {
              handleChangeScreen("lg");
            }}
            className={clsx(
              "h-8 w-8 flex justify-center items-center text-center rounded",
              { "bg-primary text-textComplementary": active === "lg" }
            )}
          >
            <Desktop size={24} />
          </button>
        </div>
        <div className="min-w-[98%] max-w-[98%] h-[calc(100vh-4rem)] mt-2 bg-background rounded-t-lg"></div>
      </div>
    </>
  );
}
