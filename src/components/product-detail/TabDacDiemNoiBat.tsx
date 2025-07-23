import Image from "next/image";

export default function TabDacDiemNoiBat({ product }: { product: any }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-4 order-2 md:order-1">
        <h3 className="text-2xl font-bold text-[#03bb65] mb-2">NGOẠI THẤT ĐẲNG CẤP</h3>
        <ul className="list-disc pl-5 text-[#1d1d1f] space-y-1">
          {product.highlights.map((h: string, idx: number) => <li key={idx}>{h}</li>)}
        </ul>
      </div>
      <div className="order-1 md:order-2 flex items-center justify-center">
        <Image src={product.gallery[0]} alt="Ngoại thất" width={500} height={320} className="rounded-2xl shadow-xl object-contain" />
      </div>
    </section>
  );
}
