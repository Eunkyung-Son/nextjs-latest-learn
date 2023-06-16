import { memo, useMemo } from "react";

export interface Photo {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ListItemProps {
  data: Photo;
}

const MemoizedListItem = ({ data }: ListItemProps) => {
  const { id, postId, name, email, body } = useMemo(() => data, [data]);
  return (
    <div
      style={{
        border: "1px solid green",
      }}
    >
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
  );
};

export default memo(MemoizedListItem);
