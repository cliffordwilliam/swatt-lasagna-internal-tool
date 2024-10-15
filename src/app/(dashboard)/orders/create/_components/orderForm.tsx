"use client";

import { useState } from 'react';
import { useItems } from "@/hooks/useItems";
import { useDebouncedCallback } from 'use-debounce';
import { formatHarga } from '@/utils/formatHarga';
import { FoundItemCard } from "./foundItemCard";
import { CartItemCard } from "./cartItemCard";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function OrderForm() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const { item, isError, isLoading } = useItems(debouncedQuery);
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState<{ id: string, name: string, price: number, quantity: number }[]>([])

    const handleSearch = useDebouncedCallback((eventTargetValue: string) => {
        setDebouncedQuery(eventTargetValue);
    }, 1000);

    const addToCart = (product: { id: string, name: string, price: number }) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                )
            } else {
                return [...prevCart, { ...product, quantity }]
            }
        })
        setQuantity(1)
    }

    const updateCartQuantity = (id: string, newQuantity: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        )
    }

    const removeFromCart = (id: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)



    let content;
    if (isError) {
        content = (
            <FoundItemCard
                title="Gagal"
                description="Tolong coba lagi."
                isError={true}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    } else if (isLoading) {
        content = (
            <FoundItemCard
                title=""
                description=""
                isLoading={true}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    } else if (item) {
        content = (
            <FoundItemCard
                title={item.nama}
                description={formatHarga(item.harga)}
                item={item}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    } else {
        content = (
            <FoundItemCard
                title="Item Tidak Ketemu."
                description={formatHarga(0)}
                isDisabled={true}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    }

    return (
        <>
            <div className='grid gap-6 w-full max-w-xl'>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-2xl font-semibold leading-none tracking-tight'>Cari Item</CardTitle>
                        <CardDescription className='text-sm text-muted-foreground'>Cari item berdasarkan nama.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="item-name">Nama Item</Label>
                            <Input
                                type="text"
                                id="item-name"
                                placeholder="Lasagna..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
                {content}
                <CartItemCard
                    cart={cart}
                    totalItems={totalItems}
                    totalPrice={totalPrice}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                />
            </div>
        </>
    );
}
