import { FormSkeleton } from "./_components/form-skeleton";

export default async function Page() {
  return (
    <>
      <div className="grid h-full gap-4 p-6">
        <FormSkeleton />
      </div>
    </>
  );
}
