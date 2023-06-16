import { useMemo } from "react";
import { ListItemProps } from "../MemoizedListItem/MemoizedListItem";

const ListItem = ({ data }: ListItemProps) => {
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

export default ListItem;
