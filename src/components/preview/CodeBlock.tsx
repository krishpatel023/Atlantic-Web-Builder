"use client";

import { useEffect, useState } from "react";

import { Checks } from "@phosphor-icons/react/dist/ssr";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useEditor } from "@/context/Editor/EditorProvider";
import { CopySimple } from "@phosphor-icons/react";
import { plugins, format as prettyFormat } from "pretty-format";
import renderer from "react-test-renderer";
import Recursive from "./Recursive";

export default function CodeBlock() {
  const { state } = useEditor();
  const [code, setCode] = useState<string | null>(null);

  SyntaxHighlighter.registerLanguage("jsx", jsx);

  const { ReactTestComponent } = plugins;
  const input = <Recursive element={state.editor.elements[0]} />;
  const result = prettyFormat(renderer.create(input), {
    plugins: [ReactTestComponent],
    printFunctionName: true,
    printBasicPrototype: true,
  });

  useEffect(() => {
    if (result) {
      setCode(result);
    } else {
      setCode("Something went wrong!");
    }
  }, [state.editor.elements]);

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
      <div className="relative h-full w-[95%] max-w-[calc((100vw*0.85)*0.90)] overflow-y-auto scrollbar">
        {result && (
          <SyntaxHighlighter
            language="jsx"
            style={atomDark}
            customStyle={{ width: "100", height: "100" }}
            showLineNumbers
          >
            {code ? code : ""}
          </SyntaxHighlighter>
        )}
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
