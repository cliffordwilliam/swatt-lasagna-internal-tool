export function Footer() {
  return (
    <footer className="border-t">
      <span className="container mx-auto flex h-16 items-center px-6">
        © {new Date().getFullYear()} Swatt Lasagna Internal Tool. All rights
        reserved.
      </span>
    </footer>
  );
}
