import { useEditor } from "@/context/Editor/EditorProvider";
import { SettingsType, useSettings } from "@/context/Settings/SettingsProvider";
import {
  ArrowLeft,
  BoundingBox,
  CaretLeft,
  CaretRight,
  Columns,
  Gear,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useEffect } from "react";

export default function SideBar() {
  const { state, dispatch } = useEditor();
  const { settingsState, dispatchSettings } = useSettings();

  const handleChangeSettings = (Value: SettingsType) => {
    dispatchSettings({
      type: "UPDATE_SETTINGS_STATE",
      payload: { Settings: Value },
    });
  };

  const handleToggleSidebar = () => {
    dispatchSettings({ type: "TOGGLE_SIDEBAR" });
  };
  return (
    <>
      <div
        className={clsx(
          "transition-all duration-500 h-full flex flex-col items-center gap-6",
          { "w-20 ": settingsState.sidebarActive === false },
          { "w-72 ": settingsState.sidebarActive === true }
        )}
      >
        <span
          className={clsx(
            "w-[95%] h-10 mt-6 flex items-center px-4",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-between": settingsState.sidebarActive === true }
          )}
        >
          <h1
            className={clsx("font-semibold text-lg", {
              hidden: settingsState.sidebarActive === false,
            })}
          >
            Project Name
          </h1>
          <button
            onClick={() => {
              handleToggleSidebar();
            }}
          >
            {settingsState.sidebarActive ? (
              <CaretLeft size={20} />
            ) : (
              <CaretRight size={24} />
            )}
          </button>
        </span>
        <div className="min-h-[1px] w-[85%] bg-border"></div>

        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true }
          )}
        >
          <BoundingBox size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Dashboard
          </h1>
        </button>

        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true }
          )}
          onClick={() => {
            handleChangeSettings("Settings");
          }}
        >
          <Gear size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Settings
          </h1>
        </button>
        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true }
          )}
          onClick={() => {
            handleChangeSettings("Components");
          }}
        >
          <PuzzlePiece size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Components
          </h1>
        </button>
        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true }
          )}
          onClick={() => {
            handleChangeSettings("Defaults");
          }}
        >
          <Columns size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Defaults
          </h1>
        </button>
      </div>
    </>
  );
}
