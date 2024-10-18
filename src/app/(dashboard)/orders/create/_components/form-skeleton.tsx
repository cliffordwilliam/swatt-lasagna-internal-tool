import { PageTitle } from "@/components/page-title";
import { SkeletonCard } from "./skeleton-card";

export function FormSkeleton() {
  return (
    <>
      <PageTitle backButtonHref={"/orders"} pageTitle={"Buat Order"} />
      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        {/* Left col */}
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:gap-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonCard />
          <SkeletonCard />
        </div>
        {/* Right col */}
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
      {/* Flex foot */}
      <div className="mt-4 flex items-center gap-2">
        <SkeletonCard />
      </div>
    </>
  );
}
