import Image from "next/image";
import Github from "@/assets/Github.svg";
import LinkedIn from "@/assets/LinkedIn.svg";
import Twitter from "@/assets/Twitter.svg";
import Website from "@/assets/Website.svg";

export default function Footer() {
  return (
    <div className="w-full h-12 flex justify-between items-center px-8 border-t-[1px] border-border">
      <h1 className="text-textPrimary">
        Developed by{" "}
        <a
          className="hover:text-accent"
          href="https://krish-patel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Krish Patel
        </a>
      </h1>
      <div className="flex gap-8">
        <a
          className="hover:scale-110"
          href="https://github.com/krishpatel023"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image className="w-6 h-6" src={Github} alt="" />
        </a>
        <a
          className="hover:scale-110"
          href="https://www.linkedin.com/in/krish-patel-7824231ba/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image className="w-6 h-6" src={LinkedIn} alt="" />
        </a>
        <a
          className="hover:scale-110"
          href="https://twitter.com/krish__23"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image className="w-6 h-6" src={Twitter} alt="" />
        </a>
        <a
          className="hover:scale-110"
          href="https://krish-patel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image className="w-6 h-6" src={Website} alt="" />
        </a>
      </div>
    </div>
  );
}
