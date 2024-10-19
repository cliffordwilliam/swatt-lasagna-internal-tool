import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page() {
  const userId = auth().userId;
  const orders = await getOrders(userId);

  return (
    <>
      <div className="grid h-full gap-4 p-6">
        <Button asChild className="m-auto inline-block w-min">
          <Link href="/orders/create" className="inline-block w-min">
            Create Orders
          </Link>
        </Button>

        {orders.length > 0 ? (
          <Table>
            <TableCaption>Semua orderan ada di sini.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Pembeli</TableHead>
                <TableHead>Penerima</TableHead>
                <TableHead>Tanggal Kirim</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Metode Pembayaran</TableHead>
                <TableHead>Metode Pengantaran</TableHead>
                <TableHead className="text-right">Grand Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.pembeli?.nama}</TableCell>
                  <TableCell>{order.penerima?.nama}</TableCell>
                  <TableCell>
                    {new Date(order.tanggalKirim).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.status?.name}</TableCell>
                  <TableCell>{order.pembayaran?.name}</TableCell>
                  <TableCell>{order.pickupDelivery?.name}</TableCell>
                  <TableCell className="text-right">
                    {order.grandTotal.toLocaleString()} IDR
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>Total</TableCell>
                <TableCell className="text-right">
                  {orders
                    .reduce((total, order) => total + order.grandTotal, 0)
                    .toLocaleString()}{" "}
                  IDR
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="py-4 text-center">
            <p className="text-gray-500">No orders found.</p>
          </div>
        )}
      </div>
    </>
  );
}
