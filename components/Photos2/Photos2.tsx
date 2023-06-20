"use client";
import { useEffect, useState } from "react";
import { Photo } from "../MemoizedListItem/MemoizedListItem";

// 컴포넌트 안에서 데이터 페칭 시

// 원래라면 async component로 사용하고 getPhotos 앞에 await 붙여 줘야 하는데
// use 훅을 사용하면 async await 대체 가능하다
// 그러면 사용하는 컴포넌트 쪽에서
// {/* @ts-expect-error Async Server Component */}
// ts error 유발하지 않음

function PhotosComponent2() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then(setPhotos);
  }, [setPhotos]);

  return (
    <div
      style={{
        border: "1px solid green",
        width: "550px",
        height: "100%",
      }}
    >
      {photos?.map(({ id, postId, name, email, body }) => (
        <div key={id}>
          <p
            style={{
              fontSize: "12px",
            }}
          >
            id: {id}
          </p>
          <p>postId: {postId}</p>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <p>body: {body}</p>
        </div>
      ))}
    </div>
  );
}

export default PhotosComponent2;
