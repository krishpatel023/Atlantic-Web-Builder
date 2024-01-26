import Header_1, { HeaderCode_1 } from "./Header/Header_1";
import Header_2, { HeaderCode_2 } from "./Header/Header_2";
import Header_3, { HeaderCode_3 } from "./Header/Header_3";

export interface Variants {
  name: string;
  id: number;
  component: React.FC;
  code: string;
}

export interface Components {
  name: string;
  variants: Array<Variants["id"]>;
}

export const components: Components[] = [
  {
    name: "Header",
    variants: [1, 2, 3],
  },
  {
    name: "Footer",
    variants: [1],
  },
  {
    name: "Hero",
    variants: [1],
  },
];

export const variants: Variants[] = [
  {
    name: "Header Default",
    id: 1,
    component: Header_1,
    code: HeaderCode_1,
  },
  {
    name: "Header with Fields (On This Site)",
    id: 2,
    component: Header_2,
    code: HeaderCode_2,
  },
  {
    name: "Header with Search",
    id: 3,
    component: Header_3,
    code: HeaderCode_3,
  },
];

// Function that returns the component from the component name
export function FindComponentData(componentName: string): Components | null {
  var ReturnVal: Components | null = null;
  for (var i = 0; i <= components.length - 1; i++) {
    if (components[i].name === componentName) {
      ReturnVal = components[i];
    }
  }
  return ReturnVal;
}

// Function that return the data of the variants from the array - Components.variant
export const FindVariantsOfAComponent = (variantsArray: Array<number>) => {
  var ReturnArray: Array<Variants> = [];
  for (var arr = 0; arr <= variantsArray.length - 1; arr++) {
    for (var i = 0; i <= variants.length - 1; i++) {
      if (variants[i].id === variantsArray[arr]) {
        ReturnArray.push(variants[i]);
      }
    }
  }
  return ReturnArray;
};
