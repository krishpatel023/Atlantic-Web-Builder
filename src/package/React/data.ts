import Header, { HeaderCode } from "../React/Header/Header";

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
    variants: [100],
  },
  {
    name: "Footer",
    variants: [100],
  },
  {
    name: "Hero",
    variants: [100],
  },
  {
    name: "Header2",
    variants: [100],
  },
  {
    name: "Footer2",
    variants: [100],
  },
  {
    name: "Hero2",
    variants: [100],
  },
  {
    name: "Header3",
    variants: [100],
  },
  {
    name: "Footer3",
    variants: [100],
  },
  {
    name: "Hero3",
    variants: [100],
  },
  {
    name: "Header4",
    variants: [100],
  },
  {
    name: "Footer4",
    variants: [100],
  },
  {
    name: "Hero4",
    variants: [100],
  },
  {
    name: "Header5",
    variants: [100],
  },
  {
    name: "Footer5",
    variants: [100],
  },
  {
    name: "Hero5",
    variants: [100],
  },
  {
    name: "Header6",
    variants: [100],
  },
  {
    name: "Footer6",
    variants: [100],
  },
  {
    name: "Hero6",
    variants: [100],
  },
];

export const variants: Variants[] = [
  {
    name: "Header with search",
    id: 100,
    component: Header,
    code: HeaderCode,
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
