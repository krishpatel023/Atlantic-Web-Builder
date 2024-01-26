import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Github from "@/assets/Github.svg";
export default function Header_3() {
  return (
    <div className="w-full h-16 flex justify-between items-center border-b-[1px] border-aui_border px-12 bg-aui_primary">
      <div className="h-full w-[10rem] flex justify-center items-center">
        <Link href="" className="h-full flex justify-center items-center">
          <Image src={Logo} alt="Logo" className="h-[50%] object-contain" />
        </Link>
      </div>
      <div className="h-full flex items-center gap-6">
        <input
          type="text"
          placeholder="Search"
          className="block w-full h-8 rounded-md border-[1px] shadow-sm px-4 border-aui_accent_secondary focus:ring focus:ring-aui_ring focus:ring-opacity-50"
        />
        <Link
          href=""
          className="w-20 h-8 rounded-md bg-aui_accent hover:bg-aui_accent_hover text-aui_text_accent text-center flex justify-center items-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export const HeaderCode_3 = `<div className="bg-aui_primary text-aui_text h-12 w-full flex justify-between items-center px-4">
    Header
    <button className="w-20 h-8 bg-aui_accent text-md font-semibold text-aui_text_accent flex justify-center items-center text-center rounded-sm">
      Login
    </button>
  </div>`;
