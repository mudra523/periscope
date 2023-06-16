import React from "react";
import { Row, Col, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const UserProfile = ({user}) => {
  const { id, name, avatar, online } = user;
  const navigate = useNavigate();
  function goToProfile() {
    navigate(`/profile/${id}`);
  }

  return (
    <Row align="middle" style={{ marginBottom: "1em", flexBasis: "row" }}>
      <div style={{ display: "flex", alignItems: "center" }} onClick={goToProfile}>
        <Image
          width={35}
          className="profile_img"
          src={avatar}
          preview={false}
        />
      </div>
      <div className="profile_text" style={{ marginLeft: "0.5em" }}>
        <Text className="text_black text_bold">{name}</Text>
        {online && (
          <Text
            className="text_gray text_regular_bold"
            style={{ fontSize: "12px" }}
          >
            Available to chat
          </Text>
        )}
      </div>
    </Row>
  );
};

export default UserProfile;
