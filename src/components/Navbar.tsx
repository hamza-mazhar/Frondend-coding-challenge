import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const menuItems = [
  {
    key: "album",
    label: "Album",
    path: "/",
  },
  // {
  //   key: "photo",
  //   label: "Photo",
  //   path: "/albums/:albumId/photos/:userId/",
  // },
];

function Navbar() {
  let navigate = useNavigate();

  const onClickEvent = (e: any) => {
    switch (e.key) {
      case "album":
        navigate("/");
        break;
      // case "photo":
      //   navigate("/albums/:albumId/photos/:userId/");
      //   break;
      default:
        navigate("/");
    }
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          onClick={onClickEvent}
          theme="dark"
          mode="horizontal"
          items={menuItems}
        />
      </Header>
    </Layout>
  );
}

export default Navbar;
