"use client";
import {
  ContainerQueryLabels,
  EditorElement,
  useEditor,
} from "@/context/Editor/EditorProvider";
import Selected from "../Selected";
import React, { useContext, useEffect, useState } from "react";
import Recursive from "./Recursive";
import Default from "./Default";
import { useSettings } from "@/context/Settings/SettingsProvider";
import DragAndDropContext from "@/context/dragAndDrop/DragAndDropContext";
import { v4 } from "uuid";
import { containerElements } from "@/utils/constants";
import { useDragAndDrop } from "@/context/dragAndDrop/DragAndDropWrapper";

export default function Components({ element }: { element: EditorElement }) {
  const { id, content, name, styles, type } = element;

  const [textValue, setTextValue] = useState<string | null>(null);
  const [styling, setStyling] = useState<string | null>(null);
  const hoverStyling: string = " hover:border-2 hover:border-accent py-2 ";
  const selectedStyling: string = " border-2 border-accent py-2 ";
  const previewStyling: string =
    " border-[1px] border-gray-400 border-dashed py-2";

  const { state, dispatch } = useEditor();
  const { settingsState, dispatchSettings } = useSettings();
  const { componentData, setComponentData, onDrop, handleDragOver } =
    useDragAndDrop();
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

    console.log("ERROR DEBUG", element.tag, element);
  }, [element]);

  const handleStyling = () => {
    const tempStyle = element.styles.reduce((acc, style) => {
      return acc + " " + style;
    }, "");
    const queryList: Array<ContainerQueryLabels> = [
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
    ];
    var modifiedTempStyle = tempStyle;

    queryList.map((item) => {
      modifiedTempStyle = transformToContainerQueries(modifiedTempStyle, item);
      return modifiedTempStyle;
    });
    // console.log(modifiedTempStyle);

    setStyling(modifiedTempStyle);
  };

  function transformToContainerQueries(
    inputString: string,
    queryFind: ContainerQueryLabels,
  ) {
    const regEx: Record<ContainerQueryLabels, RegExp> = {
      sm: /sm:/g,
      md: /md:/g,
      lg: /lg:/g,
      xl: /\bxl:/g,
      "2xl": /\b2xl:/g,
      "3xl": /\b3xl:/g,
      "4xl": /\b4xl:/g,
      "5xl": /\b5xl:/g,
      "6xl": /\b6xl:/g,
      "7xl": /\b7xl:/g,
    };
    if (inputString.includes(queryFind)) {
      // If "@md:" is present in the string, replace it with "md:"

      let reversedString = inputString.replace(
        regEx[queryFind],
        `@${queryFind}:`,
      );
      return reversedString;
    } else {
      // If "@md:" is not present, return the original string
      return inputString;
    }
  }

  const handleTextData = () => {
    const { textData } = element.special as {
      textData?: string;
    };
    if (textData !== undefined) setTextValue(textData);
  };

  const handleHover = (value: boolean) => {
    if (settingsState.previewMode === true) return;
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
    if (settingsState.previewMode === true) return;
    e.stopPropagation();
    dispatch({
      type: "UPDATE_SELECTED_ELEMENT",
      payload: {
        elementId: element.id,
      },
    });
    dispatchSettings({
      type: "UPDATE_SETTINGS_STATE",
      payload: {
        Settings: "Settings",
      },
    });
  };

  const handleElementReplacementDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    setComponentData({
      elementStatus: "replace",
      elementType: "component",
      elementData: element,
    });
    console.log("DRAG START ", element.tag);
  };

  return (
    <>
      {Array.isArray(content) &&
        (content.length > 0 ? (
          element.tag !== undefined &&
          element.tag !== "unknown" &&
          element.type === "component_element" ? (
            // <Selected element={element}>
            <element.tag
              className={`${styling}  ${
                state.editor.hoverElement === id &&
                settingsState.previewMode === false
                  ? hoverStyling
                  : ""
              } ${
                state.editor.selectedElement === id &&
                settingsState.previewMode === false
                  ? selectedStyling
                  : ""
              }
                ${settingsState.previewMode === false && state.editor.selectedElement !== id && state.editor.hoverElement !== id ? previewStyling : null}`}
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
              //ID OF PARENT

              onDrop={(e: React.DragEvent) =>
                onDrop(
                  e,
                  element.tag ? (element.tag as string) : null,
                  element.id,
                )
              }
              onDragOver={handleDragOver}
              //Replace the component logic
              draggable
              onDragStart={(e: React.DragEvent) => {
                handleElementReplacementDragStart(e);
              }}
            >
              {content.map((childElement, i) => (
                <Recursive element={childElement} key={i} />
              ))}
            </element.tag>
          ) : (
            // </Selected>
            content.map((childElement, i) => (
              <Recursive element={childElement} key={i} />
            ))
          )
        ) : (
          <>
            {element.tag !== undefined && element.tag !== "unknown" && (
              <element.tag
                className={`${styling} ${
                  state.editor.hoverElement === id &&
                  settingsState.previewMode === false
                    ? hoverStyling
                    : ""
                } ${
                  state.editor.selectedElement === id &&
                  settingsState.previewMode === false
                    ? selectedStyling
                    : ""
                } ${settingsState.previewMode === false && state.editor.selectedElement !== id && state.editor.hoverElement !== id ? previewStyling : null}`}
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
                onDrop={(e: React.DragEvent) =>
                  onDrop(
                    e,
                    element.tag ? (element.tag as string) : null,
                    element.id,
                  )
                }
                onDragOver={handleDragOver}
                //Replace the component logic
                draggable
                onDragStart={(e: React.DragEvent) => {
                  handleElementReplacementDragStart(e);
                }}
              >
                {textValue ? textValue : null}
              </element.tag>
            )}
          </>
        ))}
    </>
  );
}

type ElementTag = {
  elementTag:
    | keyof JSX.IntrinsicElements
    | React.ComponentType<any>
    | "unknown"
    | null;
  children: any;
};

const ElementTag = ({ elementTag, children }: ElementTag) => {
  return (
    <>
      {/* {elementTag !== undefined && elementTag !== "unknown" &&  <elementTag>
      {children}
    </elementTag>} */}
    </>
  );
};
