"use client";
import Editor from "@/components/web-builder/Editor/Editor";
import Settings from "@/components/web-builder/Settings/Settings";
import SideBar from "@/components/web-builder/SideBar/SideBar";
import EditorProvider, { useEditor } from "@/context/Editor/EditorProvider";
import SettingsProvider from "@/context/Settings/SettingsProvider";
import { getSession } from "@/context/UserData/AuthLogic";
import { useUser } from "@/context/UserData/UserProvider";
import DragAndDropWrapper from "@/context/dragAndDrop/DragAndDropWrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditorComponent(projectId: { projectId: string }) {
  const { state, handleCodeUpdateToBackend, handleInitialFetchRequest } =
    useEditor();
  const { userState } = useUser();
  const router = useRouter();

  const [status, setStatus] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const initialFunc = async () => {
    if (userState?.userData?.userID && projectId?.projectId) {
      const resp = await handleInitialFetchRequest({
        userId: userState?.userData?.userID,
        projectId: projectId.projectId,
      });

      if (resp) {
        setStatus(resp.status);
        setStatusMessage(resp.message);
      }
    }
  };

  const checkSession = async () => {
    const isSession = await getSession();

    if (isSession) {
      await initialFunc();
    } else {
      router.push("/signin");
    }
  };
  const updateFunc = async () => {
    const isSession = await getSession();

    if (isSession) {
      if (userState?.userData?.userID && projectId?.projectId) {
        await handleCodeUpdateToBackend({
          userId: userState?.userData?.userID,
          projectId: projectId?.projectId,
        });
      }
    }
  };
  useEffect(() => {
    checkSession();
  }, [userState.loginStatus]);
  useEffect(() => {
    updateFunc();
  }, [state.editor.elements]);

  return (
    <>
      {status && projectId?.projectId ? (
        <div className="flex h-screen w-full overflow-hidden">
          <SideBar />
          <Editor projectId={projectId?.projectId} />
          <Settings />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <h1 className="text-2xl">
            {statusMessage ? statusMessage : "Something went wrong!"}
          </h1>
        </div>
      )}
    </>
  );
}
