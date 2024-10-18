import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export const formatDate = (date: Date | undefined) => {
  if (!date) return "Tidak ada tanggal tersedia";

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
