"use client";
// import { EditorAction } from './editor-actions'
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { EditorAction } from "./EditorActions";
export type EditorBtns =
  | "text"
  | "container"
  | "link"
  | "video"
  | "__body"
  | "image"
  | "component"
  | "component_element"
  | null;

export const defaultStyles: Array<string> = ["w-full"];

export type ContainerQueryLabels =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

export type EditorElement = {
  id: string;
  styles: Array<string>;
  name: string;
  type: EditorBtns;
  tag?: keyof JSX.IntrinsicElements | React.ComponentType<any> | "unknown";
  content: EditorElement[];
  special?: {};
  elementRef?: React.RefObject<HTMLElement>;
};

export type Editor = {
  elements: EditorElement[];
  selectedElement: string | null;
  hoverElement: string | null;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: [],
      type: "__body",
      special: {},
    },
  ],
  selectedElement: null,
  hoverElement: null,
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addRefToElements = (editorElem: EditorElement): EditorElement => {
  editorElem.content.map((item) => {
    item = addRefToElements(item);
    item = { ...item, elementRef: { current: null } };
    return item;
  });
  return editorElem;
};

const removeRefToElements = (editorArray: EditorElement[]) => {
  return editorArray.map((item) => {
    removeRefToElements(item.content);
    const { elementRef, ...rest } = item;
    return { ...rest };
  });
};

const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Add Element editor State",
    );
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [
          ...item.content,
          // { ...action.payload.elementDetails, elementRef: { current: null } },
          { ...action.payload.elementDetails },
        ],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }
    return item;
  });
};

const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT")
    throw Error(
      "You sent the wrong action type to the Delete Element editor State",
    );
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementId) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action);
    }
    return item;
  });
};

const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error("You sent the wrong action type to the update Element State");
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }
    return item;
  });
};

const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };
      // Update the history to include the entire updated EditorState
      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState }, // Save a copy of the updated state
      ];

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };

      return newEditorState;
    case "UPDATE_ELEMENT":
      // Perform your logic to update the element in the state
      const updatedElements = updateAnElement(state.editor.elements, action);

      // const UpdatedElementIsSelected =
      //   state.editor.selectedElement === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
      };

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate }, // Save a copy of the updated state
      ];
      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };
      return updatedEditor;
    case "DELETE_ELEMENT":
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action,
      );
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      };
      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        updatedEditorStateAfterDelete, // Save a copy of the updated state
      ];

      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: state.history.currentIndex + 1,
        },
      };
      return deletedState;
    case "UPDATE_SELECTED_ELEMENT":
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementId,
        },
      };

    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;

    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;
    case "UPDATE_HOVER":
      return {
        ...state,
        editor: {
          ...state.editor,
          hoverElement: action.payload.elementId,
        },
      };
    case "ADD_REF":
      const updatedElementAfterRef = addRefToElements(action.payload.element);
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: [updatedElementAfterRef],
        },
      };
    case "UPDATE_EDITOR_STATE":
      const updatedElementsDirect = action.payload.newEeditorState;
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: updatedElementsDirect,
        },
      };

    default:
      return state;
  }
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  handleInitialFetchRequest: ({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) => any;

  handleCodeUpdateToBackend: ({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) => void;
}>({
  state: initialState,
  dispatch: () => undefined,
  handleInitialFetchRequest: ({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) => {},
  handleCodeUpdateToBackend: ({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) => {},
});

type EditorProps = {
  children: React.ReactNode;
};

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const handleInitialFetchRequest = async ({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) => {
    if (!userId || !projectId)
      return { status: false, message: "Ops! Something went wrong" };

    const response = await axios.get(
      `${BACKEND_URL}/projects?authorId=${userId}&projectId=${projectId}`,
      HEADER_CONFIG,
    );

    if (response.data.status === true) {
      dispatch({
        type: "UPDATE_EDITOR_STATE",
        payload: {
          newEeditorState: [response.data.data.code],
        },
      });
      return { status: true, message: "Project Loaded Successfully" };
    }
    return {
      status: false,
      message: "Project Not Found. The project you are looking for is deleted.",
    };
  };

  const handleCodeUpdateToBackend = async ({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) => {
    if (!userId || !projectId) return;
    await axios.put(
      `${BACKEND_URL}/projects?authorId=${userId}&projectId=${projectId}`,
      {
        code: state.editor.elements[0],
      },
      HEADER_CONFIG,
    );
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        handleInitialFetchRequest,
        handleCodeUpdateToBackend,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default EditorProvider;
