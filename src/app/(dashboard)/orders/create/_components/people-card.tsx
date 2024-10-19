"use client";

import { ComboBoxResponsive } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { postPeopleFormSchema, postPeopleFormType } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { People } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function PeopleCard({
  isBuyer,
  comboboxItems,
  selectedItemId,
  setSelectedItemId,
  onPostPeopleFormSubmit,
}: {
  isBuyer: boolean;
  comboboxItems: {
    value: string;
    label: string;
  }[];
  selectedItemId: string;
  setSelectedItemId: (selectedItemId: string) => void;
  onPostPeopleFormSubmit: (data: postPeopleFormType) => Promise<People>;
}) {
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const { toast } = useToast();

  const pembeliPenerima = isBuyer ? "Pembeli" : "Penerima";

  // 1. Define your form.
  const form = useForm<postPeopleFormType>({
    resolver: zodResolver(postPeopleFormSchema),
    defaultValues: {
      nama: "",
      alamat: "",
      noHp: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: postPeopleFormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setIsSubmitting(true);
    try {
      // Tell parent about it
      const newPerson = await onPostPeopleFormSubmit(values);
      toast({
        title: "Berhasil",
        description: `${newPerson.nama} telah ditambahkan.`,
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Error",
        description: "Gagal menambahkan data.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pilih {pembeliPenerima}</CardTitle>
          <CardDescription>
            Pilih atau buat {pembeliPenerima} di sini.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <ComboBoxResponsive
            placeholderItemName={pembeliPenerima}
            comboboxItems={comboboxItems}
            selectedValue={selectedItemId}
            setSelectedValue={setSelectedItemId}
            groupItems={false}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Buat {pembeliPenerima} Baru</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat {pembeliPenerima} Baru</DialogTitle>
                <DialogDescription>
                  Buat {pembeliPenerima} Baru di sini, tekan simpan kalau
                  selesai.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama {pembeliPenerima}.</FormLabel>
                        <FormControl>
                          <Input placeholder="Budi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alamat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat {pembeliPenerima}.</FormLabel>
                        <FormControl>
                          <Input placeholder="Jl. Raya No. 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="noHp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No HP {pembeliPenerima}.</FormLabel>
                        <FormControl>
                          <Input placeholder="0812-3456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    {isSubmitting ? (
                      <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Tunggu ya...
                      </Button>
                    ) : (
                      <Button type="submit">Simpan</Button>
                    )}
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
}
