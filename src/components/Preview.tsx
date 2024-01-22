"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
} from "@/package/React/data";
import { renderToString } from "react-dom/server";
export default function Preview({ variant }: { variant: Variants }) {
  const [mode, setMode] = useState<"preview" | "code">("preview");

  const handleModeChange = (): void => {
    if (mode === "preview") {
      setMode("code");
    } else if (mode === "code") {
      setMode("preview");
    }
  };

  return (
    <>
      {variant ? (
        <div className="w-full ">
          <div className="w-full h-16 flex justify-between items-center">
            <h1 className="font-semibold text-xl text-textPrimary">
              Header with Search
            </h1>
            <div className="flex justify-center items-center h-full gap-4">
              <div className="flex gap-2 bg-secondary rounded-md h-10 justify-center items-center px-2">
                <button
                  className={clsx("w-24 h-8 rounded-md ", {
                    "bg-primary text-textComplementary": mode === "preview",
                  })}
                  onClick={handleModeChange}
                >
                  Preview
                </button>
                <button
                  className={clsx("w-16 h-8 rounded-md ", {
                    "bg-primary text-textComplementary": mode === "code",
                  })}
                  onClick={handleModeChange}
                >
                  Code
                </button>
              </div>
              <button className="w-10 h-10 bg-secondary flex justify-center items-center rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* BOX */}
          <div className="w-full min-h-80  border-[2px] border-border rounded-md">
            {mode === "preview" ? (
              <div className="w-full flex justify-center items-center">
                <variant.component />
              </div>
            ) : null}
            {mode === "code" ? (
              <div className="w-full flex justify-start items-start">
                <code>
                  <variant.component />
                </code>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
