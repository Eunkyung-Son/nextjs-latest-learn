import { Metadata } from "next";
import { Suspense } from "react";
import MemoizedListItem, {
  Photo,
} from "../../components/MemoizedListItem/MemoizedListItem";

export const metadata: Metadata = {
  title: "EUNKYUNG",
  description: "nextjs practice",
};
const getPhotos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  console.log(res, "res");
  const data = await res.json();
  return data;
};

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
  const photos: Photo[] = await getPhotos();

  console.log(photos, "data");

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        border: "1px solid black",
      }}
    >
      <h1>ssr page component</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {photos.map((photo) => (
          <MemoizedListItem key={photo.id} data={photo} />
        ))}
      </Suspense>
    </div>
  );
}
