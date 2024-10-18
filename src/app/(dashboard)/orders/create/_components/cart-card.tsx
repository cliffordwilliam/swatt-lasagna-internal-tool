"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { Item } from "@prisma/client";

interface CartItem extends Item {
  quantity: number;
}

export function CartCard({
  cart,
  setCart,
  totalItems,
  totalPrice,
}: {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalItems: number;
  totalPrice: number;
}) {
  const { toast } = useToast();

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    toast({
      title: "Dibuang",
      description: "Item dibuang dari keranjang.",
    });
  };

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    // Update quantity
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Keranjang Items</CardTitle>
          <CardDescription>
            Ini semua Items mu di dalam keranjang.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Buang</TableHead>
              </TableRow>
            </TableHeader>

            {cart.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" disabled={true}>
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nama}</TableCell>

                    <TableCell>
                      <Label htmlFor={item.id} className="sr-only">
                        Stock
                      </Label>
                      <Input
                        id={item.id}
                        type="number"
                        placeholder="0"
                        // Render state if more than 0, if not render ""
                        value={item.quantity > 0 ? item.quantity : ""}
                        onChange={(e) => {
                          // Parse int whatever the user typed
                          const toNumber = parseInt(e.target.value);
                          updateCartItemQuantity(
                            item.id,
                            // Nan? Set state to 0, state min is 0
                            isNaN(toNumber) ? 0 : Math.max(0, toNumber),
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
        <CardFooter className="grid gap-3 border-t p-4 p-6 text-sm">
          <div className="font-semibold">Info Keranjang</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Jumlah Item</span>
              <span>{totalItems}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Harga</span>
              <span>{formatCurrency(totalPrice)}</span>
            </li>
          </ul>
        </CardFooter>
      </Card>
    </>
  );
}
