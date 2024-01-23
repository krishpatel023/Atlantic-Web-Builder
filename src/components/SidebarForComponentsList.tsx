import { components } from "@/package/React/data";
import clsx from "clsx";
import Link from "next/link";
export default function SidebarForComponentsList({
  active,
}: {
  active: string;
}) {
  return (
    <div className="w-full h-full pt-4 overflow-y-auto search-bar">
      {components.map((data, i) => (
        <div className="w-full mb-2 flex justify-center" key={i}>
          <Link
            className={clsx(
              "w-[95%] rounded-md h-10 text-center flex px-4 items-center text-sm font-light",
              {
                "bg-primary text-white hover:bg-primary": data.name === active,
              },
              { "text-textPrimary hover:bg-secondary": data.name !== active }
            )}
            href={`/components/${data.name}`}
          >
            {data.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
