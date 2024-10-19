import { Item } from "@prisma/client";
import { z } from "zod";

export interface CartItem extends Item {
  quantity: number;
}

export const postPeopleFormSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama harus lebih dari 2 huruf.",
  }),
  alamat: z.string().min(5, {
    message: "Alamat harus lebih dari 5 karakter.",
  }),
  noHp: z.string().min(10, {
    message: "Nomor HP harus lebih dari 10 digit.",
  }),
});

export type postPeopleFormType = z.infer<typeof postPeopleFormSchema>;

export const postOrderFormSchema = z.object({
  pembeliId: z.string().min(1, { message: "Pembeli ID harus diisi." }),
  penerimaId: z.string().min(1, { message: "Penerima ID harus diisi." }),
  tanggalOrder: z.date(),
  tanggalKirim: z.date(),
  totalPembelian: z
    .number()
    .min(0, { message: "Total pembelian tidak boleh kurang dari 0." }),
  pickupDeliveryId: z
    .string()
    .min(1, { message: "ID pengantaran harus diisi." }),
  ongkir: z.number().min(0, { message: "Ongkir tidak boleh kurang dari 0." }),
  grandTotal: z
    .number()
    .min(0, { message: "Grand total tidak boleh kurang dari 0." }),
  pembayaranId: z.string().min(1, { message: "ID pembayaran harus diisi." }),

  items: z.array(
    z.object({
      id: z.string().min(1),
      nama: z.string(),
      harga: z.number().min(0),
      quantity: z.number().min(1, { message: "Kuantitas harus lebih dari 0." }),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),

  orderStatusId: z.string().min(1, { message: "ID status order harus diisi." }),
  note: z.string().min(1, { message: "Note harus diisi." }),
});

export type postOrderFormType = z.infer<typeof postOrderFormSchema>;

export type OrderKeys = keyof z.infer<typeof postOrderFormSchema>;
