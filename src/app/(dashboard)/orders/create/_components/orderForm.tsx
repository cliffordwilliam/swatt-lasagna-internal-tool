"use client";

import { useState } from 'react';
import { useItems } from "@/hooks/useItems";
import { FoundItemCard } from "./foundItemCard";
import { CartItemCard } from "./cartItemCard";
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ComboboxDemo } from "@/components/combobox";
import { Item } from '@prisma/client';

export function OrderForm() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const { items, isError, isLoading } = useItems();
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState<{ id: string, name: string, price: number, quantity: number }[]>([])

    const addToCart = (product: { id: string; name: string; price: number }) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            const validQuantity = Number.isNaN(quantity) || quantity <= 0 ? 1 : quantity; // Default to 1 if invalid

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + validQuantity } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: validQuantity }];
            }
        });
        setQuantity(1); // Reset quantity after adding to cart
    }

    const updateCartQuantity = (id: string, newQuantity: number) => {
        // Do this later on submission, let user have nan in input
        // const validNewQuantity = Number.isNaN(newQuantity) || newQuantity <= 0 ? 1 : newQuantity; // Default to 1 if invalid

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
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
                isError={true}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    } else if (isLoading) {
        content = (
            <FoundItemCard
                isLoading={true}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    } else if (selectedItem) {
        content = (
            <FoundItemCard
                item={selectedItem}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    } else {
        content = (
            <FoundItemCard
                isDisabled={true}
                setQuantity={setQuantity}
                quantity={quantity}
                addToCart={addToCart}
            />
        );
    }

    const handleFrameworkSelect = (value: string) => {
        const foundItem = items?.find(item => item.id === value) || null;
        setSelectedItem(foundItem);
    }

    const transformedItems = items?.map((item) => ({
        value: item.nama,
        label: item.nama,
    })) || [];


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
                            <ComboboxDemo
                                frameworks={transformedItems}
                                onSelect={handleFrameworkSelect}
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
