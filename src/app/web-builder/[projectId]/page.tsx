"use client";
import Editor from "@/components/web-builder/Editor/Editor";
import EditorComponent from "@/components/web-builder/Editor/EditorComponent";
import Settings from "@/components/web-builder/Settings/Settings";
import SideBar from "@/components/web-builder/SideBar/SideBar";
import EditorProvider, { useEditor } from "@/context/Editor/EditorProvider";
import SettingsProvider from "@/context/Settings/SettingsProvider";
import { getSession } from "@/context/UserData/AuthLogic";
import { useUser } from "@/context/UserData/UserProvider";
import DragAndDropWrapper from "@/context/dragAndDrop/DragAndDropWrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WebsiteBuilder({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <>
      <SettingsProvider>
        <EditorProvider>
          <DragAndDropWrapper>
            <EditorComponent projectId={params.projectId} />
          </DragAndDropWrapper>
        </EditorProvider>
      </SettingsProvider>
    </>
  );
}
