"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-2xl">Terjadi Kesalahan</CardTitle>
          </div>
          <CardDescription>Ada yang salah saat mengambil item.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Maap ya, tolong coba lagi.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => reset()} className="w-full">
            Coba Lagi
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
