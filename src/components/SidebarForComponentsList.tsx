import { components } from "@/package/React/data";

export default function SidebarForComponentsList() {
  return (
    <div className="w-[15rem] h-full flex flex-col items-center pt-4 gap-1">
      {components.map((data, i) => (
        <div
          key={i}
          className="w-[90%] rounded-full h-10 text-center flex px-4 items-center text-sm font-light text-textPrimary hover:bg-accentLight"
        >
          {data.name}
        </div>
      ))}
    </div>
  );
}
