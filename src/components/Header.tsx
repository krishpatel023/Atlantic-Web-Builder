import Image from "next/image";
import Link from "next/link";
import Github from "../assets/Github.svg";

const Header = () => {
  return (
    <div className="w-full h-16 flex justify-between items-center border-b-[1px] border-border px-12 ">
      <div className="h-full flex justify-center items-center">
        <h1>Atlantic UI</h1>
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
