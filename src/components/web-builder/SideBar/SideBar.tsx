import {
  ArrowLeft,
  BoundingBox,
  CaretLeft,
  CaretRight,
  Columns,
  Gear,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useEffect } from "react";

export default function SideBar({
  handleSidebar,
  sidebarActive,
}: {
  handleSidebar: Function;
  sidebarActive: boolean;
}) {
  useEffect(() => {
    console.log(sidebarActive);
  }, [sidebarActive]);
  return (
    <>
      <div
        className={clsx(
          "transition-all duration-500 h-full flex flex-col items-center gap-6",
          { "w-20 ": sidebarActive === false },
          { "w-72 ": sidebarActive === true }
        )}
      >
        <span
          className={clsx(
            "w-[95%] h-10 mt-6 flex items-center px-4",
            { "justify-center": sidebarActive === false },
            { "justify-between": sidebarActive === true }
          )}
        >
          <h1
            className={clsx("font-semibold text-lg", {
              hidden: sidebarActive === false,
            })}
          >
            Project Name
          </h1>
          <button
            onClick={() => {
              handleSidebar();
            }}
          >
            {sidebarActive ? <CaretLeft size={20} /> : <CaretRight size={24} />}
          </button>
        </span>
        <div className="min-h-[1px] w-[85%] bg-border"></div>

        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": sidebarActive === false },
            { "justify-start": sidebarActive === true }
          )}
        >
          <BoundingBox size={20} />
          <h1 className={clsx({ hidden: sidebarActive === false })}>
            Dashboard
          </h1>
        </button>

        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": sidebarActive === false },
            { "justify-start": sidebarActive === true }
          )}
        >
          {" "}
          <Gear size={20} />
          <h1 className={clsx({ hidden: sidebarActive === false })}>
            Settings
          </h1>
        </button>
        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": sidebarActive === false },
            { "justify-start": sidebarActive === true }
          )}
        >
          {" "}
          <PuzzlePiece size={20} />
          <h1 className={clsx({ hidden: sidebarActive === false })}>
            Components
          </h1>
        </button>
        <button
          className={clsx(
            "w-[80%] h-8 flex items-center gap-6",
            { "justify-center": sidebarActive === false },
            { "justify-start": sidebarActive === true }
          )}
        >
          {" "}
          <Columns size={20} />
          <h1 className={clsx({ hidden: sidebarActive === false })}>
            Structures
          </h1>
        </button>
      </div>
    </>
  );
}
