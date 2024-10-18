import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ChevronLeft } from "lucide-react";

export function PageTitle({
  backButtonHref,
  pageTitle,
}: {
  backButtonHref: string;
  pageTitle: string;
}) {
  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href={backButtonHref}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {pageTitle}
        </h1>
      </div>
    </>
  );
}
