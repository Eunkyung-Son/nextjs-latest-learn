import { RenderingInfo } from "../../../../components/rendering-info";

export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ id: "bitcoin" }, { id: "ethereum" }, { id: "flow" }];
}

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${params.id}`,
    { next: { revalidate: 10 } }
  );
  const data = (await res.json()) as { title: string; body: string };

  console.log(data);

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <RenderingInfo type="isr" />
      </div>
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {/* 타이틀{JSON.stringify(data)} */}
          {params.id}
        </h1>
        <p className="font-medium text-gray-500">{JSON.stringify(data)}</p>
      </div>
    </div>
  );
}
