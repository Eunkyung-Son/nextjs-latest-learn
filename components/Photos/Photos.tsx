"use client";

import { useQuery } from "@tanstack/react-query";

import { Photo } from "../MemoizedListItem/MemoizedListItem";
import NextImage from "next/image";
async function getPhotos() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  const data = await res.json();
  return data as Photo[];
}

// 컴포넌트 안에서 데이터 페칭 시

// 원래라면 async component로 사용하고 getPhotos 앞에 await 붙여 줘야 하는데
// use 훅을 사용하면 async await 대체 가능하다
// 그러면 사용하는 컴포넌트 쪽에서
// {/* @ts-expect-error Async Server Component */}
// ts error 유발하지 않음

function PhotosComponent() {
  const { data: photoList } = useQuery({
    queryKey: ["posts"],
    queryFn: getPhotos,
  });

  return (
    <div>
      {photoList?.map(({ id, albumId, title, url, thumbnailUrl }) => (
        <div key={id}>
          <p
            style={{
              fontSize: "12px",
            }}
          >
            {id}
          </p>
          <p>{albumId}</p>
          <p>{title}</p>
          <p>{url}</p>
          <NextImage src={thumbnailUrl} alt={title} width={100} height={100} />
        </div>
      ))}
    </div>
  );
}

export default PhotosComponent;
