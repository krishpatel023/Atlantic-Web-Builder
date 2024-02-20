import { EditorElement } from "@/context/Editor/EditorProvider";
import React from "react";
import Text from "./Text";
import Container from "./Container";
import Components from "./Components";
import Default from "./Default";

type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <Text element={element} />;
    // case "container":
    //   return <Container element={element} />;
    // case "video":
    //   return <VideoComponent element={element} />;
    case "__body":
      return <Container element={element} />;
    // case "link":
    //   return <LinkComponent element={element} />;
    case "component":
      return <Components element={element} />;
    case "component_element":
      return <Components element={element} />;
    default:
      return null;
  }
};

export default Recursive;
