import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Album } from "../utils/typed";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface GalleryProps {
  items: Array<Album>;
}

export const AlbumSection = ({ items }: GalleryProps) => {
  const navigate = useNavigate();

  const goToPhotoPage = useCallback(
    (item: Album) => {
      navigate("/albums/" + item.id + "/photos/" + item.userId, {
        state: item,
      });
    },
    [navigate]
  );

  const columns: ColumnsType<Album> = [
    {
      title: "Image",
      dataIndex: "image_URL_here",
      render: (t, r) => (
        <>
          <img
            src={`${process.env.REACT_APP_PLACEHOLDER_API_URL}/150/${r.color}`}
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
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button onClick={() => goToPhotoPage(record)}>Details</Button>
      ),
    },
  ];

  return (
    <section className="album-section">
      <Table
        scroll={{ y: 300 }}
        columns={columns}
        dataSource={items}
        bordered
        size="middle"
      />
    </section>
  );
};
