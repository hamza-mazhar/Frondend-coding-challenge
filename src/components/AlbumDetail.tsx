import { Album, User } from "../utils/typed";

type AlbumDetailProps = {
  user?: User;
  album: Album | null;
};

export const AlbumDetail = ({ user, album }: AlbumDetailProps) => {
  return (
    <section className="album-details">
      {!album && <>Album not found!</>}
      <div>
        {user && (
          <h2>
            Name: {user?.name} ({user?.username})
          </h2>
        )}
        {album && (
          <>
            <h2>Title: {album?.title}</h2>
          </>
        )}
      </div>

      {album && (
        <>
          <img
            src={`${process.env.REACT_APP_PLACEHOLDER_API_URL}/150/${user?.color}`}
            alt={album?.title || ""}
          />
        </>
      )}
    </section>
  );
};
