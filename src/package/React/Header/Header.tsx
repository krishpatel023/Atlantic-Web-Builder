export default function Header() {
  return (
    <div className="bg-background h-12 w-full flex justify-between items-center px-4">
      Header
      <button className="w-20 h-8 bg-primary text-md font-semibold text-textComplementary flex justify-center items-center text-center rounded-sm">
        Login
      </button>
    </div>
  );
}

export const HeaderCode = `export default function Header() {
  return (
    <div className="bg-white h-12 w-full flex justify-between items-center px-4">
      Header
      <button className="w-20 h-8 bg-black text-md font-semibold text-white flex justify-center items-center text-center rounded">
        Login
      </button>
    </div>
  );
}`;
