import OnThisPage from "@/components/OnThisPage";

export default function Components({
  params,
}: {
  params: { componentName: string };
}) {
  return (
    <div>
      <div>
        <OnThisPage component={params.componentName} />
      </div>
    </div>
  );
}
