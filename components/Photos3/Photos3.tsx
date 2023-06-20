import { use } from "react";
import { Photo } from "../MemoizedListItem/MemoizedListItem";

// 컴포넌트 안에서 데이터 페칭 시

// 원래라면 async component로 사용하고 getPhotos 앞에 await 붙여 줘야 하는데
// use 훅을 사용하면 async await 대체 가능하다
// 그러면 사용하는 컴포넌트 쪽에서
// {/* @ts-expect-error Async Server Component */}
// ts error 유발하지 않음
async function getPhotos() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  const data = await res.json();
  return data as Photo[];
}
function PhotosComponent3() {
  const photoList = use(getPhotos());

  return (
    <div
      style={{
        border: "1px solid green",
        width: "550px",
        height: "100%",
      }}
    >
      {photoList?.map(({ id, postId, name, email, body }) => (
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

export default PhotosComponent3;
