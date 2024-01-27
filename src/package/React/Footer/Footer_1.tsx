import Image from "next/image";
import Logo from "@/assets/logo.png";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  Copyright,
} from "@phosphor-icons/react/dist/ssr";

export default function Footer_1() {
  return (
    <>
      <div className="w-full bg-aui_primary flex flex-col items-center justify-center">
        <div className="w-full h-24 flex justify-center items-center">
          <Image src={Logo} alt="Logo" className="h-10 object-contain" />
        </div>
        <div className="w-[90%] bg-aui_border min-h-[1px]"></div>
        <div className="w-full h-16 flex justify-center items-center gap-6">
          <InstagramLogo
            size={28}
            weight="fill"
            className="hover:scale-110 hover:cursor-pointer"
          />
          <TwitterLogo
            size={28}
            weight="fill"
            className="hover:scale-110 hover:cursor-pointer"
          />
          <FacebookLogo
            size={28}
            weight="fill"
            className="hover:scale-110 hover:cursor-pointer"
          />
        </div>
        <div className="w-full h-16 border-t-[1px] border-border flex justify-center items-center mt-4 gap-2 text-aui_text_secondary text-center">
          <Copyright size={20} />
          <span>2023 Atlantic UI</span>
        </div>
      </div>
    </>
  );
}

export const FooterCode_1 = "";
