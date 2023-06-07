export interface ListItemProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const ListItem = ({ albumId, id, title, url, thumbnailUrl }: ListItemProps) => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "orange",
      }}
    >
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
      <p>{thumbnailUrl}</p>
    </div>
  );
};

export default ListItem;
