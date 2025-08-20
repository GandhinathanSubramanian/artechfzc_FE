import Link from "next/link";

export const HeaderComponent = () => {
  return (
    <header className="bg-amber-100 h-12 sticky top-0">
      <nav className="flex items-center justify-between h-full px-8">
        <Link href="/" className="hover:text-blue-700 hover:underline">
          Home
        </Link>
        <div className="flex gap-x-4">
          <Link
            href="/services"
            className="hover:text-blue-700 hover:underline"
          >
            Services
          </Link>
          <Link
            href="/consultation"
            className="hover:text-blue-700 hover:underline"
          >
            Consultation
          </Link>
          <Link href="/about" className="hover:text-blue-700 hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-blue-700 hover:underline">
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
};
