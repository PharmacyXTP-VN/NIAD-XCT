// File: src/layouts/DefaultLayout.tsx
"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
