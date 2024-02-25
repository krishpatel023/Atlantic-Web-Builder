"use client";
import {
  Desktop,
  DeviceMobileCamera,
  DeviceTablet,
  Laptop,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useState } from "react";
import { Dropable } from "@/components/DragAndDrop/Dropable";
import {
  ArrowArcLeft,
  ArrowArcRight,
  ArrowsOut,
  Eye,
  EyeClosed,
  EyeSlash,
} from "@phosphor-icons/react";
import { useEditor } from "@/context/Editor/EditorProvider";
import Recursive from "./Editable/Recursive";
import { DeviceTypes, useSettings } from "@/context/Settings/SettingsProvider";

export default function Editor() {
  const [active, setActive] = useState<DeviceTypes>("Desktop");

  const { state, dispatch } = useEditor();
  const { settingsState, dispatchSettings } = useSettings();

  const handleChangeScreen = (screen: DeviceTypes) => {
    dispatchSettings({
      type: "CHANGE_DEVICE",
      payload: {
        device: screen,
      },
    });
  };

  const handleTogglePreview = () => {
    dispatchSettings({
      type: "TOGGLE_PREVIEW_MODE",
    });
  };

  const handleUndo = () => {
    dispatch({
      type: "UNDO",
    });
  };

  const handleRedo = () => {
    dispatch({
      type: "REDO",
    });
  };
  return (
    <>
      <div
        className={clsx(
          " flex flex-col items-center justify-center bg-secondary transition-all duration-500",
          { "w-[calc(100vw-24rem)]": settingsState.sidebarActive === false },
          { "w-[calc(100vw-38rem)]": settingsState.sidebarActive === true },
        )}
      >
        <div className="flex h-16 w-full items-center justify-between px-6">
          <div className="flex h-10 w-20 items-center justify-center gap-2 rounded-xl bg-background">
            <button
              onClick={() => {
                handleTogglePreview();
              }}
            >
              {settingsState.previewMode === false ? (
                <EyeSlash size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
            <div className="h-full min-w-[1px] bg-slate-200"></div>
            <button>
              <ArrowsOut size={20} />
            </button>
          </div>
          <div className="flex h-10 items-center gap-4 rounded-lg bg-background px-4 py-2">
            <button
              onClick={() => {
                handleChangeScreen("Mobile");
              }}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded text-center",
                {
                  "bg-primary text-textComplementary":
                    settingsState.device === "Mobile",
                },
              )}
            >
              <DeviceMobileCamera size={24} />
            </button>
            <button
              onClick={() => {
                handleChangeScreen("Tablet");
              }}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded text-center",
                {
                  "bg-primary text-textComplementary":
                    settingsState.device === "Tablet",
                },
              )}
            >
              <DeviceTablet size={24} />
            </button>
            <button
              onClick={() => {
                handleChangeScreen("Desktop");
              }}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded text-center",
                {
                  "bg-primary text-textComplementary":
                    settingsState.device === "Desktop",
                },
              )}
            >
              <Desktop size={24} />
            </button>
          </div>

          <div className="flex h-10 w-20 items-center justify-center gap-2 rounded-xl bg-background">
            <button
              onClick={handleUndo}
              disabled={state.history.currentIndex === 0}
              className="h-full disabled:text-textSecondary"
            >
              <ArrowArcLeft size={20} />
            </button>
            <div className="h-full min-w-[1px] bg-slate-200"></div>
            <button
              onClick={handleRedo}
              disabled={
                state.history.currentIndex === state.history.history.length - 1
              }
              className="h-full disabled:text-textSecondary"
            >
              <ArrowArcRight size={20} />
            </button>
          </div>
        </div>

        {/* <Dropable className="w-full"> */}
        {/* EDITOR */}
        <div
          className={` h-full max-w-[98%] overflow-y-auto  rounded-t-lg bg-background @container 
          ${settingsState.device === "Desktop" && "w-full"}
          ${settingsState.device === "Tablet" && "w-[650px]"} 
          ${settingsState.device === "Mobile" && "w-[420px]"}`}
        >
          {Array.isArray(state.editor.elements) &&
            state.editor.elements.map((childElement) => (
              <Recursive key={childElement.id} element={childElement} />
            ))}
        </div>
        {/* </Dropable> */}
      </div>
    </>
  );
}
