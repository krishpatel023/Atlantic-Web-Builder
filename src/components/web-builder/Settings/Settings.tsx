"use client";
import { useEditor } from "@/context/Editor/EditorProvider";
import Settings_Components from "./Settings_Components";
import { useEffect, useState } from "react";
import Settings_Defaults from "./Settings_Defaults";
import Settings_Main from "./Settings_Main";
import { SettingsType, useSettings } from "@/context/Settings/SettingsProvider";

export default function Settings() {
  const { settingsState } = useSettings();

  const [active, setActive] = useState<SettingsType>();

  useEffect(() => {
    setActive(settingsState.settingsState);
  }, [settingsState.settingsState]);
  return (
    <>
      <div className="w-80">
        {active === "Components" && <Settings_Components />}
        {active === "Defaults" && <Settings_Defaults />}
        {active === "Settings" && <Settings_Main />}
      </div>
    </>
  );
}
