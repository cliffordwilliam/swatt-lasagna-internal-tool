import { Button } from "@/components/ui/button"
import { Item } from '@prisma/client';
import clsx from 'clsx';
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatHarga } from "@/utils/formatHarga";

export function FoundItemCard({
    item,
    isDisabled = false,
    isError = false,
    isLoading = false,
    setQuantity,
    quantity,
    addToCart,
}: {
    item?: Item;
    isDisabled?: boolean;
    isError?: boolean;
    isLoading?: boolean;
    setQuantity: (quantity: number) => void;
    quantity: number;
    addToCart: (item: { id: string, name: string, price: number }) => void;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-semibold leading-none tracking-tight'>Item yang Ketemu</CardTitle>
                <CardDescription className='text-sm text-muted-foreground'>Item yang ketemu di tampilkan di sini.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* TODO: Pasta, cookies, cake, other */}
                {/* TODO: Filter by the above category into their own fields */}
                <div className="grid gap-4">
                    <div key={item ? item.id : 0}
                        className={clsx(
                            {
                            'hidden': isLoading,
                            'rounded-md border p-4 h-20 flex justify-between items-center space-x-4': !isLoading,
                            },
                        )}
                    >
                        <div className='grid gap-1'>
                            <p
                                className={clsx(
                                    "text-sm font-medium leading-none line-clamp-1",
                                    {
                                    'text-destructive': isError,
                                    },
                                )}
                            >{item ? item.nama : "Tolong Pilil Item di Atas Dulu."}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{formatHarga(item ? item.harga : 0)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                        <Input
                            type="number"
                            id="item-quantity"
                            min="1"
                            value={quantity}
                            disabled={isDisabled || isError || isLoading}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setQuantity(value);
                            }}
                            aria-label={`Jumlah item ${quantity}`}
                            className={clsx(
                                "w-16",
                                {
                                    'border-destructive': Number.isNaN(quantity),
                                },
                            )}
                        />
                        <p id="error-message"
                            className={clsx(
                                {
                                    'hidden': !Number.isNaN(quantity),
                                },
                                {
                                    'text-sm text-destructive': Number.isNaN(quantity),
                                },
                            )}
                        >
                            Please enter a valid number
                        </p>
                        </div>

                    </div>
                    <Skeleton
                        className={clsx(
                            {
                            'hidden': !isLoading,
                            'border h-20': isLoading,
                            },
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="p-6 border-t px-6 py-4">
                <Button
                    className="w-full"
                    onClick={item ? () => addToCart({ id: item.id, name: item.nama, price: item.harga }) : undefined}
                    disabled={isDisabled || isError || isLoading}
                >
                    Masukin ke Keranjang
                </Button>
            </CardFooter>
        </Card>
    );
}