import { Suspense } from "react";
import { getItems } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = auth();
  const allItems = await getItems(userId);

  return (
    <>
      <div className="grid h-full gap-4 p-6">
        <Suspense fallback={<p>Loading feed...</p>}>
          <ul>
            {allItems.map((item) => (
              <li key={item.id}>{item.nama}</li>
            ))}
          </ul>
        </Suspense>
      </div>
    </>
  );
}
