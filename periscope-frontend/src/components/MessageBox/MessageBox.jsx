import React from "react";
import { Row, Col, Image, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";

const { Text } = Typography;

const ProfileMessage = () => {
  const { following } = useSelector((state) => state.auth.user);

  return (
    <div style={{height:"90vh"}} className="bg_primary_mid">
      <Row justify="space-between" style={{padding:"1em"}}>
        <Col flex={2}>
          <div>
            <Text
              className="text_alert text_semi_bold"
              style={{ fontSize: "18px" }}
            >
              <CommentOutlined />
            </Text>
            &nbsp;&nbsp;
            <Text className="text_gray text_bold">Message</Text>
          </div>
        </Col>
        <Col
          flex={4}
          className="text_alert text_bold text_right"
          style={{ fontSize: "18px" }}
        >
          {following.length}
        </Col>
      </Row>
      <div style={{ padding: "1em" }} >
        {following.map((user) => (
          <UserProfile
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileMessage;
