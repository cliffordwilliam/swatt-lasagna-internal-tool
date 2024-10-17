import { Aside } from "./_components/aside";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-1 bg-muted/40">
        <Aside />
        <main className="container mx-auto h-full flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
