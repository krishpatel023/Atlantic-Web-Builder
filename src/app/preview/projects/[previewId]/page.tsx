"use client";
import OnThisPage from "@/components/OnThisPage";
import Preview from "@/components/Preview";
import { useEffect, useState } from "react";
import {
  Components,
  FindComponentData,
  FindVariantFromId,
  FindVariantsOfAComponent,
  Variants,
} from "@/package/React/data";
import SidebarForComponentsList from "@/components/SidebarForComponentsList";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";
import { getSession } from "@/context/UserData/AuthLogic";
import { EditorElement } from "@/context/Editor/EditorProvider";
import Recursive from "@/components/preview/Recursive";

export default function PreviewFullscreen({
  params,
}: {
  params: { previewId: string };
}) {
  const [elements, setElements] = useState<EditorElement[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const userCookie = await checkAuth();
      const preview = params.previewId;
      if (preview && userCookie?.userData) {
        await handleInitialFetchRequest({
          userId: userCookie.userData.userID,
          projectId: preview,
        });
      } else {
        setErrorMessage("Ops! An Error Occured");
      }
    };

    fetchData();
  }, [params.previewId]);

  const checkAuth = async () => {
    console.log("checkAuth called");
    const session = await getSession();
    const response = session.state;
    console.log("getSession response:", response);
    if (response?.userData) {
      const { userID, name, email, projects } = response.userData as {
        userID?: string;
        name?: string;
        email?: string;
        projects?: Array<string>;
      };
      console.log("userData from response:", { userID, name, email, projects });
      if (!userID || !name || !email || !projects) {
        console.log("userData is missing some info");
        return null;
      }
      const userData = {
        userID: userID,
        name: name,
        email: email,
        projects: projects,
      };
      console.log("userData:", userData);
      return {
        ...response,
        userData: userData,
      };
    } else {
      console.log("user is not logged in");
      setErrorMessage("Please Login to View This Project");
    }
  };

  const handleInitialFetchRequest = async ({
    userId,
    projectId,
  }: {
    userId?: string;
    projectId: string;
  }) => {
    if (!userId || !projectId) return null;

    const response = await axios.get(
      `${BACKEND_URL}/projects/get/${userId}/${projectId}`,
      HEADER_CONFIG,
    );

    if (response.data.status === true) {
      setElements([response.data.data.code]);
    } else {
      setElements(null);
      setErrorMessage(
        "Project Not Found. The project you are looking for is deleted.",
      );
    }
  };
  return (
    <>
      {elements ? (
        <div className="min-h-screen w-full">
          {/* <Background /> */}
          {errorMessage ? null : <Recursive element={elements[0]} />}
        </div>
      ) : null}
    </>
  );
}

function Background() {
  return (
    <>
      {" "}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
    </>
  );
}
