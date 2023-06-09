import { Photo } from "../MemoizedListItem/MemoizedListItem";
import NextImage from "next/image";
async function PhotosComponent({ promise }: { promise: Promise<Photo[]> }) {
  const photoList = await promise;

  return (
    <div>
      {photoList.map(({ id, albumId, title, url, thumbnailUrl }) => (
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
