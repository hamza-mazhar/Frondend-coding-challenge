import { Album, Photo, User } from "../utils/typed";
import { Card } from "antd";

type PhotoDetailProps = {
  user: User;
  photo: Photo;
  album: Album;
};

export const PhotoDetailSection = ({
  user,
  photo,
  album,
}: PhotoDetailProps) => {
  return (
    <section>
      <Card hoverable>
        <div className="photo-details-card-body">
          <div>
            <h4>{album.title}</h4>
            <span>{`Name: ${user.name}  ${user.username}`}</span>
          </div>
          <img alt={photo.title} src={photo.url} style={{ width: 240 }} />
        </div>
      </Card>
    </section>
  );
};
