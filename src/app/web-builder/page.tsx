"use client";
import Editor from "@/components/web-builder/Editor/Editor";
import Settings from "@/components/web-builder/Settings/Settings";
import SideBar from "@/components/web-builder/SideBar/SideBar";
import EditorProvider from "@/context/Editor/EditorProvider";
import SettingsProvider from "@/context/Settings/SettingsProvider";
import DragAndDropWrapper from "@/context/dragAndDrop/DragAndDropWrapper";

export default function Page() {
  return (
    <>
      <SettingsProvider>
        <EditorProvider>
          <DragAndDropWrapper>
            <div className="flex h-screen w-full overflow-hidden">
              <SideBar />
              <Editor />
              <Settings />
            </div>
          </DragAndDropWrapper>
        </EditorProvider>
      </SettingsProvider>
    </>
  );
}
