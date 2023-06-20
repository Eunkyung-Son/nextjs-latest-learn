// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin`, {
    next: { revalidate: 10 },
  });

  const data = await res.json();

  return <h1>{JSON.stringify(data.tickers)}</h1>;
}
