import React from "react";
import { Menu, Row, Col, Image, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Messages from "../../components/MessageBox/MessageBox";
import {
  GlobalOutlined,
  LineChartOutlined,
  TeamOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import styles from "./Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { roomModalVisible } from "../../store/roomModalSlice";
import { logout } from "../../http";
import { setAuth } from "../../store/authSlice";


const { Text } = Typography;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const Sider = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const showRoomModal = () => {
    dispatch(roomModalVisible(true));
  };
  const navigate = useNavigate();

  const items = [
    getItem("All Rooms", "1", <GlobalOutlined />),
    getItem("Popular", "2", <LineChartOutlined />),
    getItem("Following", "3", <TeamOutlined />),
    getItem("Messages", "4", <CommentOutlined />),
    getItem("Logout", "5", <LogoutOutlined />),
  ];
  function goToProfile() {
    navigate(`/profile/${user.id}`);
  }

  const Profile = ({ image, name, userName }) => (
    <Row
      justify="start"
      style={{ marginBottom: "2em", marginTop: "1em" }}
      onClick={goToProfile}
    >
      <Col style={{ marginRight: "2em" }} className="pointer">
        <Image width={45} className="profile_img" src={image}  preview={false}/>
      </Col>
      <Col className="profile_text pointer">
        <Text className="text_black text_bold">{name}</Text>
        <Text className="text_gray text_regular_bold">{`@${userName}`}</Text>
      </Col>
    </Row>
  );

  const logOutFunction = async () => {
    dispatch(setAuth({user:null}));
    localStorage.clear();
    navigate('/')
  }

  const onClick = (e) => {
    if (e.key === "1") navigate(`/home`);
    if (e.key === "2") navigate(`/popular`);
    if (e.key === "3") navigate(`/following`);
    if (e.key === "4") navigate(`/message`);
    if (e.key === "5") logOutFunction();
  };

  return (
    <>
      <Profile image={user.avatar} name={user.name} userName={user.userName} />
      <Row style={{ marginBottom: "1em" }}>
        <Button
          type="primary"
          className="text_black theme_btn"
          style={{ width: "100%" }}
          onClick={showRoomModal}
        >
          <UsergroupAddOutlined /> Start a room
        </Button>
      </Row>
      <Menu
        className="pointer"
        onClick={onClick}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ marginBottom: "1em" }}
      />
    </>
  );
};

export default Sider;
