import { Suspense } from "react";
import { Metadata } from "next";
import MemoizedListItem, {
  type Photo as PhotoType,
} from "../../../components/MemoizedListItem/MemoizedListItem";
import PhotosComponent from "../../../components/Photos/Photos";

export const metadata: Metadata = {
  title: "EUNKYUNG",
  description: "nextjs practice",
};

async function getPhotoById(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const data = await res.json();
  return data as PhotoType;
}

export default async function Page() {
  const photo = await getPhotoById(2);

  return (
    <div
      style={{
        backgroundColor: "min",
        border: "1px solid black",
      }}
    >
      <h1>Hello Dashboard Page!!</h1>
      <h1>ssr page component</h1>
      <div
        style={{
          border: "1px solid black",
        }}
      >
        <h1>no suspense boundary</h1>
        <MemoizedListItem key={photo.id} data={photo} />
      </div>
      <h1>suspense boundary</h1>
      <Suspense fallback={"loading....!!!!"}>
        <PhotosComponent />
      </Suspense>
    </div>
  );
}
