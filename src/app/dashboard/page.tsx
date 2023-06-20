import { Suspense } from "react";
import { Metadata } from "next";
import MemoizedListItem, {
  type Photo as PhotoType,
} from "../../../components/MemoizedListItem/MemoizedListItem";
import HydratedPosts from "../hydratedPhotos";
import PhotosComponent3 from "../../../components/Photos3";

export const metadata: Metadata = {
  title: "EUNKYUNG",
  description: "nextjs practice",
};

async function getPhotoById(id: number) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
    {
      cache: "no-store",
    }
  );
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
        width: "1000px",
        height: "100%",
      }}
    >
      <h1>Hello Dashboard Page!!</h1>
      <h1>ssr page component</h1>
      <div
        style={{
          border: "1px solid black",
        }}
      >
        <h1>non-suspense boundary</h1>

        <MemoizedListItem key={photo.id} data={photo} />
      </div>
      <h1>suspense boundary</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <Suspense fallback={"loading....!!!!"}>
          <PhotosComponent3 />
        </Suspense>
        <Suspense fallback={"loading....!!!!"}>
          <HydratedPosts />
        </Suspense>
      </div>
    </div>
  );
}
