import { Metadata } from "next";
import { Suspense } from "react";
import ListItem from "../../components/ListItem/ListItem";

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
  const photos = await getPhotos();

  console.log(photos, "data");

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "gray",
      }}
    >
      <h1>Hello, Root page!!!</h1>
      <Suspense
        fallback={
          <div
            style={{
              width: "100px",
              height: "100px",
            }}
          >
            ...loading
          </div>
        }
      >
        <ListItem {...photos} />
        {/* <ul> */}
        {/* {photos?.map((photo: any) => (
            <li key={photo.id}>{photo.name}</li>
          ))} */}
        {/* </ul> */}
      </Suspense>
    </div>
  );
}
