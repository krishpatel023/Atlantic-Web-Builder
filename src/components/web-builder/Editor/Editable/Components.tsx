"use client";
import { EditorElement, useEditor } from "@/context/Editor/EditorProvider";
import Selected from "../Selected";
import React, { useEffect, useState } from "react";
import Recursive from "./Recursive";
import Default from "./Default";

export default function Components({ element }: { element: EditorElement }) {
  const { id, content, name, styles, type } = element;

  const [textValue, setTextValue] = useState<string | null>(null);
  const [styling, setStyling] = useState<string | null>(null);
  const hoverStyling: string = " hover:border-2 hover:border-accent";
  const selectedStyling: string = " border-2 border-accent";

  const { state, dispatch } = useEditor();
  const { className, textData, ...rest } = element.special as {
    className?: string;
    href?: string;
    src?: string;
    textData?: string;
  };

  useEffect(() => {
    console.log("------------  Default Element");
    handleTextData();
    handleStyling();
  }, [element]);

  const handleStyling = () => {
    const tempStyle = element.styles.reduce((acc, style) => {
      return acc + style;
    }, "");
    setStyling(tempStyle);
  };

  const handleTextData = () => {
    const { textData } = element.special as {
      textData?: string;
    };
    if (textData !== undefined) setTextValue(textData);
  };

  const handleHover = (value: boolean) => {
    if (value) {
      dispatch({
        type: "UPDATE_HOVER",
        payload: {
          elementId: id,
        },
      });
    } else {
      dispatch({
        type: "UPDATE_HOVER",
        payload: {
          elementId: null,
        },
      });
    }
  };

  const handleElementSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "UPDATE_SELECTED_ELEMENT",
      payload: {
        elementId: id,
      },
    });
  };

  return (
    <>
      {Array.isArray(content) &&
        (content.length > 0 ? (
          element.tag !== undefined &&
          element.tag !== "unknown" &&
          element.type === "component_element" ? (
            <Selected element={element}>
              <element.tag
                className={`${styling} ${
                  state.editor.hoverElement === id ? hoverStyling : ""
                } ${
                  state.editor.selectedElement === id ? selectedStyling : ""
                }`}
                {...rest}
                id={element.id}
                onMouseEnter={() => {
                  handleHover(true);
                }}
                onMouseLeave={() => {
                  handleHover(false);
                }}
                onClick={(e: React.MouseEvent) => {
                  handleElementSelection(e);
                }}
              >
                {content.map((childElement) => (
                  <Recursive element={childElement} />
                ))}
              </element.tag>
            </Selected>
          ) : (
            content.map((childElement) => <Recursive element={childElement} />)
          )
        ) : (
          <Selected element={element}>
            {element.tag !== undefined && element.tag !== "unknown" && (
              <element.tag
                className={`${styling} ${
                  state.editor.hoverElement === id ? hoverStyling : ""
                } ${
                  state.editor.selectedElement === id ? selectedStyling : ""
                }`}
                {...rest}
                id={element.id}
                onMouseEnter={() => {
                  handleHover(true);
                }}
                onMouseLeave={() => {
                  handleHover(false);
                }}
                onClick={(e: React.MouseEvent) => {
                  handleElementSelection(e);
                }}
              >
                {textValue}
              </element.tag>
            )}
          </Selected>
        ))}
    </>
  );
}
