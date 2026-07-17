import Image from "next/image";
import logo from "@/public/images/logo.png";

const FOOTER = {
  campaign: "Abans SmartPay · Tiken Tika Pay",
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6">
        <Image src={logo} alt="Abans" className="h-6 w-auto" />
        <p className="text-xs font-semibold text-gray-700">{FOOTER.campaign}</p>
      </div>
    </footer>
  );
}
