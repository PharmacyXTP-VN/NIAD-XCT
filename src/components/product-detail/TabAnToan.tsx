import Image from "next/image";

export default function TabAnToan({ product }: { product: any }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="flex items-center justify-center">
        <Image src={product.gallery[3]} alt="An toàn" width={500} height={320} className="rounded-2xl shadow-xl object-contain" />
      </div>
      <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-[#03bb65] mb-2">AN TOÀN & HỖ TRỢ</h3>
        <ul className="list-disc pl-5 text-[#1d1d1f] space-y-1">
          {product.safety.map((h: string, idx: number) => <li key={idx}>{h}</li>)}
        </ul>
      </div>
    </section>
  );
}
