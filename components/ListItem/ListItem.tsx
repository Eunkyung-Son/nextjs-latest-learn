import NextImage from "next/image";
import { memo, useMemo } from "react";
import { ListItemProps } from "../MemoizedListItem/MemoizedListItem";

const ListItem = ({ data }: ListItemProps) => {
  const { id, albumId, title, url, thumbnailUrl } = useMemo(() => data, [data]);
  return (
    <div>
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
  );
};

export default ListItem;
