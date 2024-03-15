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

import renderer from "react-test-renderer";
import { plugins, format as prettyFormat } from "pretty-format";
import { EditorElement } from "@/context/Editor/EditorProvider";
import Recursive from "./Recursive";
import { CopySimple } from "@phosphor-icons/react";

const { ReactElement, ReactTestComponent } = plugins;

export default function CodeBlock({ element }: { element: EditorElement }) {
  SyntaxHighlighter.registerLanguage("jsx", jsx);

  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    handleLoad();
  }, []);
  const handleLoad = () => {
    const input = <ElementCall myElement={element} />;
    const result = prettyFormat(renderer.create(input), {
      plugins: [ReactTestComponent],
      printFunctionName: true,
      printBasicPrototype: true,
    });
    if (result) {
      setCode(result);
    } else {
      setCode("Something went wrong!");
    }
  };

  const [btnClick, setBtnClick] = useState(false);
  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setBtnClick(true);
    const time = setTimeout(handleCopyBtn, 1000);
  };

  function handleCopyBtn() {
    setBtnClick(false);
  }

  return (
    <>
      <div className="scrollbar relative h-full w-[95%] max-w-[calc((100vw*0.85)*0.90)] overflow-y-auto">
        <SyntaxHighlighter
          language="jsx"
          style={atomDark}
          customStyle={{ width: "100", height: "100" }}
          showLineNumbers
        >
          {code ? code : ""}
        </SyntaxHighlighter>
        {btnClick ? (
          <button className="absolute right-4 top-6 rounded-lg border-2 border-green-400  p-2 text-green-400">
            <Checks size={20} />
          </button>
        ) : (
          <button
            className="absolute right-4 top-6 rounded-lg border-2 border-textComplementary  p-2 text-textComplementary"
            onClick={handleCopy}
          >
            <CopySimple size={24} />
          </button>
        )}
      </div>
    </>
  );
}

const ElementCall = ({ myElement }: { myElement: EditorElement }) => {
  return (
    <>
      <Recursive element={myElement} />
    </>
  );
};
