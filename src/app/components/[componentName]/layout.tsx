import Header from "@/components/Header";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full min-h-[calc(100vh-4rem)] flex">{children}</div>
    </div>
  );
}
