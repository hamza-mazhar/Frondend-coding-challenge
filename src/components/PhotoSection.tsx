import { useEffect, useState } from "react";
import { Album, Photo, User } from "../utils/typed";
import { Table, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";

import { PhotoDetailSection } from "./PhotoDetails";

interface PhotoSectionProps {
  items: Array<Photo>;
  user?: User;
  album: Album | null;
}

export const PhotoSection = ({ items, user, album }: PhotoSectionProps) => {
  const [showPhotoDetail, setShowPhotoDetail] = useState<Photo | null>(null);

  useEffect(() => {
    if (showPhotoDetail && !window.history.state.title) {
      window.history.pushState(
        { ...showPhotoDetail, isPhoto: true },
        "",
        window.location.href
      );
      window.onpopstate = (e) => {
        if (window.history.state.isPhoto)
          setShowPhotoDetail(window.history.state);
        else setShowPhotoDetail(null);
      };
    }
  }, [showPhotoDetail, setShowPhotoDetail]);

  const columns: ColumnsType<Photo> = [
    {
      title: "Image Tumbnail",
      dataIndex: "image_URL_here",
      render: (_, r) => (
        <>
          <img
            src={`${process.env.REACT_APP_PLACEHOLDER_API_URL}/150/${r.thumbnailUrl}`}
            alt={"img"}
          />
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Details",
      dataIndex: "action",
      render: (_, record) => (
        <Button onClick={() => setShowPhotoDetail(record)}>Details</Button>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={showPhotoDetail?.title}
        visible={!!showPhotoDetail}
        onCancel={() => setShowPhotoDetail(null)}
        okButtonProps={{ style: { display: "none" } }}
      >
        {album && user && showPhotoDetail && (
          <PhotoDetailSection
            photo={showPhotoDetail}
            album={album}
            user={user}
          ></PhotoDetailSection>
        )}
      </Modal>
      <section className="photo-section-table">
        {items.length <= 0 && <>There is no more photo in this album</>}
        <Table
          columns={columns}
          dataSource={items}
          bordered
          size="middle"
          scroll={{ y: 100 }}
          rowKey="tradeID"
        />
      </section>
    </>
  );
};
