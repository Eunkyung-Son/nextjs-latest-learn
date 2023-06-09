"use client";

import React, { Suspense } from "react";
import ListItem from "../../components/ListItem/ListItem";
import MemoizedListItem, {
  Photo,
} from "../../components/MemoizedListItem/MemoizedListItem";

// client 코드는 template 에서만 작성 가능
export default function Template({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = React.useState("");
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then(setPhotos);
  }, [setPhotos]);
  console.log(photos, "photos");
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        border: "1px solid black",
      }}
    >
      <p>Root Template</p>
      <p>page inside a template</p>
      <p>
        root 에 template 이 있고 하위 route 에 template가 있으면 root
        template으로 override 됨
      </p>
      <h1>csr template component</h1>
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "space-between",
          overflow: "scroll",
        }}
      >
        <div>{children}</div>
        <Suspense
          fallback={
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "red",
              }}
            >
              ...loading!!!!!!!!!!!!
            </div>
          }
        >
          <div>
            <p>no memoized</p>
            {photos.map((photo) => (
              <ListItem data={photo} key={photo.id} />
            ))}
          </div>
          <div>
            <p>memoized</p>
            {photos.map((photo) => (
              <MemoizedListItem data={photo} key={photo.id} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
