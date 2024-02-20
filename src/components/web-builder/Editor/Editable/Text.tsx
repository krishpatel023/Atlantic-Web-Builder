"use client";
import { EditorElement } from "@/context/Editor/EditorProvider";
import Selected from "../Selected";
import { useEffect, useState } from "react";

export default function Text({ element }: { element: EditorElement }) {
  const [textValue, setTextValue] = useState<string>("text");

  // useEffect(() => {
  //   if (
  //     !Array.isArray(element.content) &&
  //     element.content.innerText !== undefined
  //   ) {
  //     setTextValue(element.content.innerText);
  //   }
  // }, []);

  const handleChange = (textVal: string) => {
    setTextValue(textVal);
  };
  return (
    <Selected element={element}>
      <input
        type="text"
        value={textValue}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        className="w-full h-full placeholder:hidden border-none focus:ring-0 outline-none"
      />
    </Selected>
  );
}
