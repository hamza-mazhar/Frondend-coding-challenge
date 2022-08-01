import { FilterSection, AlbumDetail, PhotoSection } from "../components";
import { useAppSelector } from "../hooks";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { defaultPageOption, getAlbum, getPhotos } from "../utils/api";
import { Photo, Album } from "../utils/typed";
const Photos = () => {
  const { albumId, userId } = useParams();
  const location = useLocation();

  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const [loading, setLoading] = useState(true);

  const [album, setAlbum] = useState<Album | null>(location.state as any);
  const userState = useAppSelector((state) => state.userReducer);

  const user = useMemo(
    () => userState.data.find((c) => c.id === parseInt(userId || "0")),
    [userState, userId]
  );

  const fetchPhotos = useCallback(
    async (pageOption = defaultPageOption) => {
      const data = await getPhotos(
        parseInt(albumId!),
        pageOption.page,
        pageOption.size
      );
      if (data.length <= 0 && pageOption.size > 0) {
        if (pageOption.page !== 0) pageOption.page -= pageOption.size;
        return { hasNextPage: false };
      }
      setPhotos(data);
      setLoading(false);
      return { hasNextPage: true };
    },
    [albumId]
  );
  const fetchAlbum = useCallback(async () => {
    try {
      let data: Album;
      if (location.state) data = location.state as Album;
      else data = await getAlbum(parseInt(albumId!));
      setAlbum(data);
    } catch (error) {
      setAlbum(null);
      setPhotos([]);
      setLoading(false);
    }
  }, [albumId, location.state]);

  useEffect(() => {
    fetchAlbum();
    fetchPhotos();
  }, [fetchPhotos, fetchAlbum]);

  return (
    <Fragment>
      {!loading && <AlbumDetail user={user} album={album} />}
      <FilterSection
        title="Photos"
        subText="View Photos"
        changeFilter={fetchPhotos}
      />
      {!loading && (
        <PhotoSection items={photos} album={album} user={user}></PhotoSection>
      )}
    </Fragment>
  );
};

export default Photos;
