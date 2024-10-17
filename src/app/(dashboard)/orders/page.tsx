import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="grid h-full gap-4 p-6">
        <Button asChild className="m-auto inline-block w-min">
          <Link href="/orders/create" className="inline-block w-min">
            Create Orders
          </Link>
        </Button>
      </div>
    </>
  );
}
