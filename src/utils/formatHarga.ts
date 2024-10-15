// utils/formatHarga.ts
export const formatHarga = (harga: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(harga);
};
