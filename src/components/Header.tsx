import Image from "next/image";
import Link from "next/link";
import Github from "../assets/Github.svg";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="w-full h-16 flex justify-between items-center border-b-[1px] border-border px-12 bg-background">
      <div className="h-full w-[10rem] flex justify-center items-center">
        <Link href="/" className="h-full flex justify-center items-center">
          <Image src={Logo} alt="Logo" className="h-[50%] object-contain" />
        </Link>
      </div>
      <div className="h-full flex items-center gap-8">
        <Link
          href="/components"
          className="text-textSecondary hover:text-textPrimary"
        >
          Components
        </Link>
        <Link
          href="/website"
          className="text-textSecondary hover:text-textPrimary"
        >
          Website Builder
        </Link>
        <Link
          href="/docs"
          className="text-textSecondary hover:text-textPrimary"
        >
          Docs
        </Link>
        <div>
          <a
            href="https://github.com/krishpatel023/Atlantic-UI"
            target="_blank"
          >
            <Image src={Github} alt="Github Image" />
          </a>
        </div>
        <Link
          href="/signin"
          className="w-20 h-8 rounded-md bg-primary hover:bg-primaryHover text-textComplementary text-center flex justify-center items-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
