import NextImage from "next/image";
import { memo, useMemo } from "react";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface ListItemProps {
  data: Photo;
}

const MemoizedListItem = ({ data }: ListItemProps) => {
  // const { albumId, id, title, url, thumbnailUrl } = data;
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

export default memo(MemoizedListItem);
