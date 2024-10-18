import { fetchCreateOrderFormData } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import { Form } from "./_components/form";

export default async function Page() {
  const userId = auth().userId;
  // Artificially delay a response for testing skeleton
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { items, pickupDeliveries, pembayarans } =
    await fetchCreateOrderFormData(userId);

  return (
    <>
      <div className="flex h-full flex-col gap-4 p-6">
        <Form
          items={items}
          pickupDeliveries={pickupDeliveries}
          pembayarans={pembayarans}
        />
      </div>
    </>
  );
}
