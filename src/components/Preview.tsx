"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
} from "@/package/React/data";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import { ArrowsOut, Checks, Copy } from "@phosphor-icons/react/dist/ssr";

export default function Preview({ variant }: { variant: Variants }) {
  SyntaxHighlighter.registerLanguage("jsx", jsx);

  const [mode, setMode] = useState<"preview" | "code">("preview");

  const handleModeChange = (): void => {
    if (mode === "preview") {
      setMode("code");
    } else if (mode === "code") {
      setMode("preview");
    }
  };
  const [btnClick, setBtnClick] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(variant.code);
    setBtnClick(true);
    const time = setTimeout(handleCopyBtn, 1000);
  };

  function handleCopyBtn() {
    setBtnClick(false);
  }
  return (
    <>
      {variant ? (
        <div className="w-full">
          <div className="w-full h-16 flex justify-between items-center">
            <h1 className="font-semibold text-xl text-textPrimary">
              {variant.name}
            </h1>
            <div className="flex justify-center items-center h-full gap-4">
              <a
                href={`/preview/${variant.id}`}
                target="_blank"
                className=" h-10 hover:scale-110 transition-all duration-200 flex justify-center items-center text-center gap-4 px-4  rounded-lg  text-textPrimary bg-secondary"
              >
                Open In Fullscreeen
                <ArrowsOut size={24} />
              </a>
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
              <button
                className={clsx(
                  "w-10 h-10 bg-secondary flex justify-center items-center rounded-md",
                  { "text-green-600": btnClick === true }
                )}
                onClick={handleCopy}
              >
                {btnClick === false ? <Copy size={20} /> : <Checks size={20} />}
              </button>
            </div>
          </div>

          {/* BOX */}

          {mode === "preview" ? (
            <div className="w-full flex justify-center items-center  border-[2px] border-border rounded-md bg-slate-200 py-10">
              <div
                className="w-[98%] min-h-80 flex justify-center items-center 
              md:max-w-[calc((100vw*0.85)*0.90)]"
              >
                <variant.component />
              </div>
            </div>
          ) : null}
          {mode === "code" ? (
            <div className="w-full min-h-80 max-w-[calc((100vw*0.85)*0.90)]">
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{ width: "100", minHeight: "21rem" }}
                showLineNumbers
              >
                {variant.code}
              </SyntaxHighlighter>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
