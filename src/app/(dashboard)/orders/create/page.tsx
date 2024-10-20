import {
  createOrderWithItems,
  fetchCreateOrderFormData,
  postPerson,
} from "@/lib/data";
import { postOrderFormType, postPeopleFormType } from "@/lib/definitions";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { Form } from "./_components/form";

export default async function Page() {
  const userId = auth().userId;
  // Artificially delay a response for testing skeleton
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { items, pickupDeliveries, pembayarans, peoples, orderStatuses } =
    await fetchCreateOrderFormData(userId);

  async function onPostOrderFormSubmit(data: postOrderFormType) {
    "use server";
    // For now put up here for testing
    revalidateTag("orders");
    revalidateTag("orderItems");
    revalidateTag("peoples");
    const newOrder = await createOrderWithItems(userId, data);
    return newOrder;
  }

  async function onPostPeopleFormSubmit(data: postPeopleFormType) {
    "use server";
    const newPerson = await postPerson(userId, data);
    revalidateTag("peoples");
    return newPerson;
  }

  return (
    <>
      <div className="flex h-full flex-col gap-4 p-6">
        <Form
          items={items}
          pickupDeliveries={pickupDeliveries}
          pembayarans={pembayarans}
          peoples={peoples}
          orderStatuses={orderStatuses}
          onPostOrderFormSubmit={onPostOrderFormSubmit}
          onPostPeopleFormSubmit={onPostPeopleFormSubmit}
        />
      </div>
    </>
  );
}
