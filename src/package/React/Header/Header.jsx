export default function Header() {
  return (
    <div className="bg-slate-300 h-12 w-full flex justify-between items-center px-4">
      Header
      <button className="w-20 h-8 bg-green-400 text-md font-semibold text-white flex justify-center items-center text-center rounded">
        Login
      </button>
    </div>
  );
}

export function HeaderCode() {
  return (
    <code>
      <div className="bg-slate-300 h-12 w-full flex justify-between items-center px-4">
        Header
        <button className="w-20 h-8 bg-green-400 text-md font-semibold text-white flex justify-center items-center text-center rounded">
          Login
        </button>
      </div>
    </code>
  );
}
