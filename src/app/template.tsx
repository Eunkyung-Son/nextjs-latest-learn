"use client";

import React from "react";

// client 코드는 template 에서만 작성 가능
export default function Template({ children }: { children: React.ReactNode }) {
  // const [message, setMessage] = React.useState("");
  // const [photos, setPhotos] = React.useState([]);
  // React.useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/photos")
  //     .then((response) => response.json())
  //     .then(setPhotos);
  // }, [setPhotos]);
  // console.log(photos, "photos");
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        backgroundColor: "lightblue",
      }}
    >
      {children}Root Template
      <p>page inside a template</p>
      <p>
        root 에 template 이 있고 하위 route 에 template가 있으면 root
        template으로 override 됨
      </p>
    </div>
  );
}
