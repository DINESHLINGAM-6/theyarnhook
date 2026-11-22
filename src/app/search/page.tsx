import type { Metadata } from "next";
import { ShopView } from "@/components/commerce/shop-view";

export const metadata: Metadata = {
  title: "Search",
  description: "Search yarns by name, fibre, colour or collection.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.q;
  const query = (Array.isArray(raw) ? raw[0] : raw) ?? "";

  return (
    <>
      <section className="border-b border-line bg-oat/40">
        <div className="container-x py-10 sm:py-14">
          <p className="kicker">Search</p>
          <h1 className="display mt-2 text-4xl sm:text-5xl">
            {query ? <>Results for “{query}”</> : "Search the shop."}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            Try a yarn name, a fibre like merino or cotton, a colour, or a collection.
          </p>
        </div>
      </section>

      <section className="container-x py-10 sm:py-14">
        <ShopView initialQuery={query} />
      </section>
    </>
  );
}
