"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OrderDatePickerCard({
  orderDate,
  setOrderDate,
}: {
  orderDate: Date | undefined;
  setOrderDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pilih Tanggal Order</CardTitle>
        <CardDescription>Tanggal order di tampilin di sini.</CardDescription>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !orderDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {orderDate ? (
                format(orderDate, "PPP")
              ) : (
                <span>Pilih Tanggal Order</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={orderDate}
              onSelect={setOrderDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
