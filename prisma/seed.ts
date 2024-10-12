import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Data for items
    const itemsData = [
        { nama: 'Lasagna', tipe: 'Mini', harga: 65000 },
        { nama: 'Lasagna', tipe: 'Small', harga: 95000 },
        { nama: 'Lasagna', tipe: 'Medium', harga: 180000 },
        { nama: 'Lasagna', tipe: 'Long', harga: 295000 },
        { nama: 'Lasagna', tipe: 'Xtra Medium', harga: 395000 },
        { nama: 'Lasagna', tipe: 'Family', harga: 495000 },
        { nama: 'Lasagna', tipe: 'Xtra Family', harga: 555000 },
        { nama: 'Lasagna', tipe: 'Party Medium', harga: 1350000 },
        { nama: 'Lasagna', tipe: 'Party Large', harga: 2750000 },

        { nama: 'Macaroni', tipe: 'Mini', harga: 50000 },
        { nama: 'Macaroni', tipe: 'Small', harga: 85000 },
        { nama: 'Macaroni', tipe: 'Oval', harga: 110000 },
        { nama: 'Macaroni', tipe: 'Medium', harga: 165000 },
        { nama: 'Macaroni', tipe: 'Long', harga: 250000 },
        { nama: 'Macaroni', tipe: 'Xtra Medium', harga: 335000 },
        { nama: 'Macaroni', tipe: 'Family', harga: 380000 },
        { nama: 'Macaroni', tipe: 'Xtra Family', harga: 445000 },
        { nama: 'Macaroni', tipe: 'Party Medium', harga: 1100000 },
        { nama: 'Macaroni', tipe: 'Party Large', harga: 2200000 },

        { nama: 'Marmer Cake', tipe: '1 Loyang Bulat', harga: 335000 },
        { nama: 'Marmer Cake', tipe: '1 Loyang Dipotong', harga: 335000 },
        { nama: 'Marmer Cake', tipe: '1 Slice', harga: 22000 },
        { nama: 'Marmer Cake', tipe: '3 Slice', harga: 63000 },
        { nama: 'Marmer Cake', tipe: '6 Slice', harga: 125000 },
        { nama: 'Marmer Cake', tipe: '9 Slice', harga: 185000 },
        { nama: 'Marmer Cake', tipe: '12 Slice', harga: 245000 },

        { nama: 'Nastar', tipe: 'Bulat', harga: 185000 },
        { nama: 'Nastar', tipe: 'Kotak', harga: 135000 },

        { nama: 'Kue Keju', tipe: 'Bulat', harga: 195000 },
        { nama: 'Kue Keju', tipe: 'Kotak', harga: 145000 },

        { nama: 'Lidah Kucing', tipe: 'Bulat', harga: 150000 },
        { nama: 'Lidah Kucing', tipe: 'Kotak', harga: 120000 },

        { nama: 'Sagu Keju', tipe: 'Bulat', harga: 150000 },
        { nama: 'Sagu Keju', tipe: 'Kotak', harga: 120000 },

        { nama: 'Almond Keju', tipe: 'Bulat', harga: 185000 },
        { nama: 'Almond Keju', tipe: 'Kotak', harga: 135000 },

        { nama: 'Cheese Stick', tipe: 'Kotak', harga: 160000 },

        { nama: 'Bolu Peuyeum', tipe: '1 Slice', harga: 11000 },
        { nama: 'Bolu Peuyeum', tipe: '5 Slice', harga: 50000 },
        { nama: 'Bolu Peuyeum', tipe: '12 Slice', harga: 110000 },
        { nama: 'Bolu Peuyeum', tipe: '1 Loyang Utuh', harga: 140000 },

        { nama: 'Roti', tipe: 'Baso', harga: 15000 },
        { nama: 'Roti', tipe: 'Keju', harga: 15000 },
        { nama: 'Roti', tipe: 'Coklat', harga: 15000 },

        { nama: 'Pudding', tipe: '1 Cup', harga: 30000 },
        { nama: 'Pudding', tipe: '4 Cup ', harga: 115000 },
        { nama: 'Pudding', tipe: '6 Cup', harga: 172500 },

        { nama: 'Box Hampers', tipe: 'Box K3', harga: 75000 },
        { nama: 'Box Hampers', tipe: 'Box K4', harga: 95000 },
        { nama: 'Box Hampers', tipe: 'Box B3', harga: 85000 },
        { nama: 'Box Hampers', tipe: 'Box B4', harga: 95000 },

        { nama: 'Tas Kain', tipe: 'MC', harga: 15000 },
        { nama: 'Tas Kain', tipe: 'K3', harga: 15000 },
        { nama: 'Tas Kain', tipe: 'K4', harga: 15000 },
        { nama: 'Tas Kain', tipe: 'B3', harga: 15000 },
        { nama: 'Tas Kain', tipe: 'B4', harga: 15000 },

        { nama: 'Hampers', tipe: 'Marmer Cake', harga: 350000 },
    ];

    // Seed items
    const createdItems = await Promise.all(
        itemsData.map(itemData => prisma.item.create({ data: itemData }))
    );
    console.log('Seeded items:', createdItems);

    // Data for pickup deliveries
    const pickupDeliveries = [
        { name: 'Pickup' },
        { name: 'Delivery' },
        { name: 'Gojek' },
        { name: 'Citytran' },
        { name: 'Paxel' },
        { name: 'Daytrans' },
        { name: 'Baraya' },
        { name: 'Lintas' },
        { name: 'Bineka' },
        { name: 'Jne' },
    ];

    // Seed pickup deliveries
    const createdPickupDeliveries = await Promise.all(
        pickupDeliveries.map(pickupDelivery => prisma.pickupDelivery.create({ data: pickupDelivery }))
    );
    console.log('Seeded pickupDeliveries:', createdPickupDeliveries);

    // Data for payments
    const Pembayarans = [
        { name: 'Tunai' },
        { name: 'Kartu Kredit' },
        { name: 'Qr' },
        { name: 'Transfer' },
    ];

    // Seed payments
    const createdPembayarans = await Promise.all(
        Pembayarans.map(pembayaran => prisma.pembayaran.create({ data: pembayaran }))
    );
    console.log('Seeded Pembayarans:', createdPembayarans);
}

// Execute the main function and handle errors
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });