import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Data for items
    const itemsData = [
        { nama: 'Lasagna Mini', harga: 65000 },
        { nama: 'Lasagna Small', harga: 95000 },
        { nama: 'Lasagna Medium', harga: 180000 },
        { nama: 'Lasagna Long', harga: 295000 },
        { nama: 'Lasagna Xtra Medium', harga: 395000 },
        { nama: 'Lasagna Family', harga: 495000 },
        { nama: 'Lasagna Xtra Family', harga: 555000 },
        { nama: 'Lasagna Party Medium', harga: 1350000 },
        { nama: 'Lasagna Party Large', harga: 2750000 },

        { nama: 'Macaroni Mini', harga: 50000 },
        { nama: 'Macaroni Small', harga: 85000 },
        { nama: 'Macaroni Oval', harga: 110000 },
        { nama: 'Macaroni Medium', harga: 165000 },
        { nama: 'Macaroni Long', harga: 250000 },
        { nama: 'Macaroni Xtra Medium', harga: 335000 },
        { nama: 'Macaroni Family', harga: 380000 },
        { nama: 'Macaroni Xtra Family', harga: 445000 },
        { nama: 'Macaroni Party Medium', harga: 1100000 },
        { nama: 'Macaroni Party Large', harga: 2200000 },

        { nama: 'Marmer Cake 1 Loyang Bulat', harga: 335000 },
        { nama: 'Marmer Cake 1 Loyang Dipotong', harga: 335000 },
        { nama: 'Marmer Cake 1 Slice', harga: 22000 },
        { nama: 'Marmer Cake 3 Slice', harga: 63000 },
        { nama: 'Marmer Cake 6 Slice', harga: 125000 },
        { nama: 'Marmer Cake 9 Slice', harga: 185000 },
        { nama: 'Marmer Cake 12 Slice', harga: 245000 },

        { nama: 'Nastar Bulat', harga: 185000 },
        { nama: 'Nastar Kotak', harga: 135000 },

        { nama: 'Kue Keju Bulat', harga: 195000 },
        { nama: 'Kue Keju Kotak', harga: 145000 },

        { nama: 'Lidah Kucing Bulat', harga: 150000 },
        { nama: 'Lidah Kucing Kotak', harga: 120000 },

        { nama: 'Sagu Keju Bulat', harga: 150000 },
        { nama: 'Sagu Keju Kotak', harga: 120000 },

        { nama: 'Almond Keju Bulat', harga: 185000 },
        { nama: 'Almond Keju Kotak', harga: 135000 },

        { nama: 'Cheese Stick Kotak', harga: 160000 },

        { nama: 'Bolu Peuyeum 1 Slice', harga: 11000 },
        { nama: 'Bolu Peuyeum 5 Slice', harga: 50000 },
        { nama: 'Bolu Peuyeum 12 Slice', harga: 110000 },
        { nama: 'Bolu Peuyeum 1 Loyang Utuh', harga: 140000 },

        { nama: 'Roti Baso', harga: 15000 },
        { nama: 'Roti Keju', harga: 15000 },
        { nama: 'Roti Coklat', harga: 15000 },

        { nama: 'Pudding 1 Cup', harga: 30000 },
        { nama: 'Pudding 4 Cup ', harga: 115000 },
        { nama: 'Pudding 6 Cup', harga: 172500 },

        { nama: 'Box Hampers Box K3', harga: 75000 },
        { nama: 'Box Hampers Box K4', harga: 95000 },
        { nama: 'Box Hampers Box B3', harga: 85000 },
        { nama: 'Box Hampers Box B4', harga: 95000 },

        { nama: 'Tas Kain MC', harga: 15000 },
        { nama: 'Tas Kain K3', harga: 15000 },
        { nama: 'Tas Kain K4', harga: 15000 },
        { nama: 'Tas Kain B3', harga: 15000 },
        { nama: 'Tas Kain B4', harga: 15000 },

        { nama: 'Hampers Marmer Cake', harga: 350000 },
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