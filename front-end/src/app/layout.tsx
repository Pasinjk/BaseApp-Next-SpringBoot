import "./globals.css";
import { Providers } from "./providers";
import { Sofia_Sans } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

const sofia = Sofia_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body className={sofia.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
