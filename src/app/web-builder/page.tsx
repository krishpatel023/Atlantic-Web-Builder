"use client";
import Editor from "@/components/web-builder/Editor";
import Settings from "@/components/web-builder/Settings/Settings";
import SideBar from "@/components/web-builder/SideBar/SideBar";
import DragAndDropWrapper from "@/context/dragAndDrop/DragAndDropWrapper";
import { useEffect, useState } from "react";

export default function page() {
  const [sidebarActive, setSidebarActive] = useState<boolean>(true);

  const handleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  useEffect(() => {
    console.log(sidebarActive);
  }, [sidebarActive]);
  return (
    <>
      <DragAndDropWrapper>
        <div className="w-full h-screen flex overflow-hidden">
          <SideBar
            handleSidebar={handleSidebar}
            sidebarActive={sidebarActive}
          />
          <Editor sidebarActive={sidebarActive} />
          <Settings />
        </div>
      </DragAndDropWrapper>
    </>
  );
}
