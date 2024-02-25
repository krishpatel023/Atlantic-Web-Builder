"use client";
import {
  ContainerQueryLabels,
  EditorElement,
  useEditor,
} from "@/context/Editor/EditorProvider";
import Selected from "../Selected";
import React, { useEffect, useState } from "react";
import Recursive from "./Recursive";
import Default from "./Default";
import { useSettings } from "@/context/Settings/SettingsProvider";

export default function Components({ element }: { element: EditorElement }) {
  const { id, content, name, styles, type } = element;

  const [textValue, setTextValue] = useState<string | null>(null);
  const [styling, setStyling] = useState<string | null>(null);
  const hoverStyling: string = " hover:border-2 hover:border-accent";
  const selectedStyling: string = " border-2 border-accent";

  const { state, dispatch } = useEditor();
  const { settingsState, dispatchSettings } = useSettings();

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
    console.log(modifiedTempStyle);

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
        elementId: id,
      },
    });
    dispatchSettings({
      type: "UPDATE_SETTINGS_STATE",
      payload: {
        Settings: "Settings",
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
                className={`${styling} py-2 ${
                  state.editor.hoverElement === id &&
                  settingsState.previewMode === false
                    ? hoverStyling
                    : ""
                } ${
                  state.editor.selectedElement === id &&
                  settingsState.previewMode === false
                    ? selectedStyling
                    : ""
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
                {content.map((childElement, i) => (
                  <Recursive element={childElement} key={i} />
                ))}
              </element.tag>
            </Selected>
          ) : (
            content.map((childElement, i) => (
              <Recursive element={childElement} key={i} />
            ))
          )
        ) : (
          <Selected element={element}>
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
