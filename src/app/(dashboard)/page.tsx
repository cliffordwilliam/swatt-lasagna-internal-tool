import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  // TODO: Move this to side bar later, this is for quick access to the only page I am working on now
  // TODO: Turn this home page into the dashboard where there are graph and stuff using parallel
  return (
    <>
      <div className="flex h-full">
        <Button asChild className="m-auto inline-block w-min">
          <Link href="/orders/create" className="inline-block w-min">
            Create Orders
          </Link>
        </Button>
      </div>
    </>
  );
}
