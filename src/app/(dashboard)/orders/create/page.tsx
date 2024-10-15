import { OrderForm } from './_components/orderForm'

export default async function Page() {
    return (
        <div className='h-full py-6 grid gap-4'>
            <h1 className="whitespace-nowrap text-2xl font-semibold tracking-tight">
                Buat Order Baru
            </h1>
            <p className="text-muted-foreground">Buat Order baru di sini, cari nama item nya dulu.</p>
            <OrderForm />
        </div>
    );
}
