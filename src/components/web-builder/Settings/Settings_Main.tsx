"use client";
import { Dragable } from "@/components/DragAndDrop/Dragable";
import {
  EditorBtns,
  EditorElement,
  useEditor,
} from "@/context/Editor/EditorProvider";
import {
  Components,
  FindComponentData,
  FindVariantsOfAComponent,
  Variants,
  components,
} from "@/package/React/data";
import {
  Barricade,
  CaretDown,
  CaretUp,
  Check,
  Eye,
  Icon,
  Plus,
  TextT,
  Trash,
  Video,
  X,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { ReactElement, useEffect, useState } from "react";

export default function Settings_Main() {
  const textData = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
  const linkData = ["a", "link"];
  const imageData = ["img"];
  const containerData = ["div"];

  const [componentType, setComponentType] = useState<
    "text" | "link" | "image" | "container" | null
  >(null);
  const [componentData, setComponentData] = useState<EditorElement | null>(
    null
  );

  const { state, dispatch } = useEditor();

  useEffect(() => {
    if (state.editor.selectedElement !== null) {
      findStateData(state.editor.selectedElement);
    } else {
      setComponentData(null);
    }
    // handleTypeSelection();
  }, [state]);

  const handleTypeSelection = () => {
    if (
      componentData?.tag &&
      componentData?.tag !== "unknown" &&
      textData.includes(componentData?.tag as string)
    )
      setComponentType("text");
    if (
      componentData?.tag &&
      componentData?.tag !== "unknown" &&
      linkData.includes(componentData?.tag as string)
    )
      setComponentType("link");
    if (
      componentData?.tag &&
      componentData?.tag !== "unknown" &&
      imageData.includes(componentData?.tag as string)
    )
      setComponentType("image");
    if (
      componentData?.tag &&
      componentData?.tag !== "unknown" &&
      containerData.includes(componentData?.tag as string)
    )
      setComponentType("container");
  };

  const findStateData = (elemId: string) => {
    const ElementDetail: EditorElement = reccursiveFinder(
      elemId,
      state.editor.elements[0].content
    );
    setComponentData(ElementDetail);
  };

  const reccursiveFinder = (elemId: string, content: Array<any>): any => {
    for (const item of content) {
      if (item.id === elemId) {
        return item;
      }

      if (item.content && Array.isArray(item.content)) {
        const nestedResult = reccursiveFinder(elemId, item.content);
        if (nestedResult) {
          return nestedResult;
        }
      }
    }

    return null;
  };

  const handleUnselect = () => {
    dispatch({
      type: "UPDATE_SELECTED_ELEMENT",
      payload: {
        elementId: null,
      },
    });
  };

  const handleDelete = () => {
    if (componentData !== null) {
      dispatch({
        type: "DELETE_ELEMENT",
        payload: {
          elementId: componentData.id,
        },
      });
    }
  };

  const handleStyleUpdate = (newVal: Array<string>) => {
    console.log("RUNNNNNNNNNNNNNNNNNNNNNN");

    if (componentData) {
      console.log("NEWVAL", newVal);

      const newElementVal: EditorElement = {
        ...componentData,
        styles: newVal,
      };
      console.log(newElementVal);
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: newElementVal,
        },
      });
    }
  };

  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="h-16 px-8 flex items-center border-b-2 border-border">
          <h1>Settings</h1>
        </div>
        {componentData === null ? (
          <div className="w-full h-[calc(100%-4rem)] flex flex-col text-center justify-center items-center px-6 gap-4">
            <Barricade size={80} />
            <h1 className="capitalize">
              Please select a component to view and modify its settings
            </h1>
          </div>
        ) : (
          <div className="w-full py-4 flex flex-col px-6 gap-4">
            <span className="capitalize flex gap-4">
              {"TAG : "}
              <h1 className="font-semibold">
                {componentData?.tag !== undefined &&
                componentData?.tag !== "unknown"
                  ? (componentData?.tag as string)
                  : null}
              </h1>
            </span>
            <div className="w-full border-slate-700 border-[1px] mt-4 mb-4"></div>
            <div className="w-full flex justify-between items-center gap-4">
              <button
                className="w-full py-1 border-2 border-primary text-textPrimary hover:bg-primary hover:text-textComplementary  rounded-sm flex justify-center items-center gap-1 transition-all duration-200"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
                <Trash size={20} />
              </button>
              <button
                className="w-full py-1 border-2 border-primary text-textPrimary hover:bg-primary hover:text-textComplementary rounded-sm flex justify-center items-center gap-1 transition-all duration-200"
                onClick={() => {
                  handleUnselect();
                }}
              >
                Unselect
                <X size={20} />
              </button>
            </div>
            <div className="w-full border-slate-700 border-[1px] mt-4 mb-4"></div>

            {Object.entries(
              componentData.special ? componentData.special : {}
            ).map(([key, value]) => {
              // Perform operations on key-value pairs here
              return (
                <InputBlock
                  name={key}
                  type={typeof value}
                  getInputData={() => {}}
                  predefinedInputData={value}
                  key={key}
                  componentData={componentData}
                />
              );
            })}
            <StyleBlock
              componentData={componentData}
              handleStyleUpdate={handleStyleUpdate}
            />
          </div>
        )}
      </div>
    </>
  );
}

const InputBlock = ({
  name,
  type,
  getInputData,
  predefinedInputData,
  componentData,
}: {
  name: string;
  type: any;
  getInputData: Function;
  predefinedInputData: any;
  componentData: EditorElement;
}) => {
  const [inputValue, setInputValue] = useState<string>(predefinedInputData);
  const { dispatch } = useEditor();
  const handleChange = () => {
    const newElement: EditorElement = {
      ...componentData,
      special: {
        ...componentData.special,
        [name]: inputValue,
      },
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: newElement,
      },
    });
  };

  useEffect(() => {
    setInputValue(predefinedInputData);
  }, [componentData]);
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <h1>{name === "textData" ? "Text" : name}</h1>

        <div className="w-full flex justify-between">
          <input
            type={type}
            className="w-[calc(100%-2.5rem-0.5rem)] h-10 rounded px-3 border-2 border-primary"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            className="w-10 h-10 bg-primary rounded text-textComplementary flex text-center justify-center items-center disabled:bg-gray-200 disabled:text-slate-400"
            onClick={() => {
              handleChange();
            }}
            disabled={predefinedInputData === inputValue ? true : false}
          >
            <Check size={20} weight="bold" />
          </button>
        </div>
      </div>
    </>
  );
};

const StyleBlock = ({
  handleStyleUpdate,
  componentData,
}: {
  handleStyleUpdate: (val: Array<string>) => void;
  componentData: EditorElement;
}) => {
  const [styleArray, setStyleArray] = useState<Array<string>>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [styling, setStyling] = useState<string>("");

  const convertStringToArray = (styleVal: string) => {
    var styleArrayTemp = styleVal.split(/\s+/);
    setStyleArray(styleArrayTemp);
  };

  const addStyle = () => {
    var styleArrayTemp = styleArray;
    console.log("CALLED", inputValue);

    if (inputValue) {
      styleArrayTemp.push(inputValue);
      setStyleArray(styleArrayTemp);
      console.log("STLE", styleArrayTemp);
      handleStyleUpdate(styleArrayTemp);
      setInputValue("");
    }
  };

  const deleteStyle = (deleteItemName: string) => {
    var styleArrayTemp = styleArray;
    console.log("CALLED", inputValue);

    if (deleteItemName) {
      styleArrayTemp = styleArray.filter((item) => item !== deleteItemName);
      setStyleArray(styleArrayTemp);
      console.log("STLE", styleArrayTemp);
      handleStyleUpdate(styleArrayTemp);
      setInputValue("");
    }
  };

  const handleStyling = () => {
    const tempStyle = componentData.styles.reduce((acc, style) => {
      return acc + " " + style;
    }, "");
    setStyling(tempStyle);
    return tempStyle;
  };

  useEffect(() => {
    const styleVal = handleStyling();
    convertStringToArray(styleVal);
  }, [componentData]);

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <h1>Class / Style</h1>
        <div className="w-full flex justify-between">
          <input
            type="text"
            className="w-[calc(100%-2.5rem-0.5rem)] h-10 rounded px-3 border-2 border-primary"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
          />
          <button
            className="w-10 h-10 bg-primary rounded text-textComplementary flex text-center justify-center items-center"
            onClick={() => {
              addStyle();
            }}
          >
            <Plus size={20} weight="bold" />
          </button>
        </div>

        <div className="flex w-full gap-2 flex-wrap">
          {styleArray.map((style, i) => (
            <>
              {style && (
                <div
                  key={i}
                  className="px-3 py-1 flex gap-4 justify-center items-center bg-primary rounded text-textComplementary text-sm"
                >
                  <p>{style}</p>
                  <button
                    onClick={() => {
                      deleteStyle(style);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};
