"use client";
import Editor from "@/components/web-builder/Editor/Editor";
import Settings from "@/components/web-builder/Settings/Settings";
import SideBar from "@/components/web-builder/SideBar/SideBar";
import { useEditor } from "@/context/Editor/EditorProvider";
import { getSession } from "@/context/UserData/AuthLogic";
import { useUser } from "@/context/UserData/UserProvider";
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
          <SideBar projectId={projectId?.projectId} />
          <Editor projectId={projectId?.projectId} />
          <Settings />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <h1 className="text-2xl">            
            {statusMessage ? statusMessage : <Loader className="size-8 animate-spin text-foreground"/>}
          </h1>
        </div>
      )}
    </>
  );
}

export const Loader = (props: React.SVGProps<SVGSVGElement>) => (
  <svg height="200" width="200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 3a9 9 0 1 0 9 9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
  </svg>
  )
