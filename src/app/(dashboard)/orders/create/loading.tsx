import { FormSkeleton } from "./_components/form-skeleton";

export default async function Page() {
  return (
    <>
      <div className="flex h-full flex-col gap-4 p-6">
        <h1 className="whitespace-nowrap text-xl font-semibold tracking-tight">
          Buat Order
        </h1>
        <FormSkeleton />
      </div>
    </>
  );
}
