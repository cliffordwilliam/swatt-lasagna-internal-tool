import { Button } from "@/components/ui/button"
import { formatHarga } from '@/utils/formatHarga';
import { Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import clsx from 'clsx';


export function CartItemCard({
    cart,
    totalItems,
    totalPrice,
    updateCartQuantity,
    removeFromCart,
}: {
    cart: { id: string, name: string, price: number, quantity: number }[];
    totalItems: number;
    totalPrice: number;
    updateCartQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-semibold leading-none tracking-tight'>Keranjang</CardTitle>
                <CardDescription className='text-sm text-muted-foreground'>Total items di dalam keranjang.</CardDescription>
            </CardHeader>
            <CardContent>
            {cart.length > 0 ? (
                cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center space-x-4 rounded-md border p-4">
                        <div className='grid gap-1'>
                            <p className="text-sm font-medium leading-none">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{formatHarga(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col items-end gap-1.5">
                            <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    updateCartQuantity(item.id, value);
                                }}
                                aria-label={`Jumlah item ${item.name}`}
                                className={clsx(
                                    "w-16",
                                    {
                                        'border-destructive': Number.isNaN(item.quantity),
                                    },
                                )}
                      
                            />
                            <p id="error-message"
                                className={clsx(
                                    {
                                        'hidden': !Number.isNaN(item.quantity),
                                    },
                                    {
                                        'text-sm text-destructive': Number.isNaN(item.quantity),
                                    },
                                )}
                            >
                                Please enter a valid number
                            </p>
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Remove ${item.name} from cart`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex justify-between items-center space-x-4 rounded-md border p-4">
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">&nbsp;</p>
                        <p className="text-sm text-muted-foreground">&nbsp;</p>
                    </div>
                </div>
            )}
            </CardContent>
            <CardFooter className="grid gap-1 p-6 border-t px-6 py-4">
                <p className="flex justify-between">
                    <span className="text-muted-foreground">Total Item:</span>
                    <span>{totalItems}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-muted-foreground">Total Harga:</span>
                    <span>{formatHarga(totalPrice)}</span>
                </p>
            </CardFooter>
        </Card>
    );
}