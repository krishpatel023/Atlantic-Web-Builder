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
  Eye,
  Icon,
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
    handleTypeSelection();
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
            <div className="w-full bg-primary min-h-[1px] mb-4"></div>
            <div className="w-full flex justify-center items-center gap-4">
              <button
                className="w-[40%] py-1 border-2 border-primary text-textPrimary hover:bg-primary hover:text-textComplementary  rounded-sm flex justify-center items-center gap-1 transition-all duration-200"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
                <Trash size={20} />
              </button>
              <button
                className="w-[40%] py-1 border-2 border-primary text-textPrimary hover:bg-primary hover:text-textComplementary rounded-sm flex justify-center items-center gap-1 transition-all duration-200"
                onClick={() => {
                  handleUnselect();
                }}
              >
                Unselect
                <X size={20} />
              </button>
            </div>
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
}: {
  name: string;
  type: any;
  getInputData: Function;
  predefinedInputData: any;
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <h1>{name}</h1>
        <input
          type={type}
          className="w-full h-10 rounded px-3"
          value={predefinedInputData ? predefinedInputData : null}
          onChange={(e) => {
            getInputData(e.target.value);
          }}
        />
      </div>
    </>
  );
};
