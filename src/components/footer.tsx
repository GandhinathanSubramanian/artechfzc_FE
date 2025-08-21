import Link from "next/link";

export const FooterComponent = () => {
  return (
    <footer className="bg-amber-100 flex flex-col h-50 justify-center items-center gap-y-4">
      <div className="flex gap-x-4">
        <Link
          href="/privacy-policy"
          className="hover:text-blue-700 hover:underline"
        >
          Privacy Policy
        </Link>
        <div>|</div>
        <Link
          href="/terms-and-conditions"
          className="hover:text-blue-700 hover:underline"
        >
          Terms and Conditions
        </Link>
      </div>
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </p>
    </footer>
  );
};
