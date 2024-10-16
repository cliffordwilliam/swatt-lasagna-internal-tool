import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1">
        {/* // TODO: Make side bar for global navigation later when I have more than 1 page */}
        <main className="container mx-auto h-full">{children}</main>
      </div>
      <Footer />
    </>
  );
}
