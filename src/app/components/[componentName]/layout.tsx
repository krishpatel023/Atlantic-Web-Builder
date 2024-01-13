import Header from "@/components/Header";
import SidebarForComponentsList from "@/components/SidebarForComponentsList";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full ">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full min-h-[calc(100vh-4rem)] flex">
        <div>
          <SidebarForComponentsList />
        </div>
        <div className="w-3/4">{children}</div>
      </div>
    </div>
  );
}
