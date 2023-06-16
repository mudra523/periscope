import React from "react";
import { Card, Typography, Tag, Image, Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import styles from "./RoomCard.module.css";

const { Text } = Typography;

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  function goToRoom() {
    // console.log(`/room/${room.id}`);
    navigate(`/room/${room.id}`);
  }

  const CardHeader = () => (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        padding: "2em",
        borderRadius: "8px 8px 0px 0px",
      }}
      className="bg_secondary"
    >
      <Text className="text_black text_bold" style={{ marginBottom: "1em" }}>
        {room.topic}
      </Text>
      <div style={{ marginBottom: "1em" }}>
        {room.tags.map((tag) => (
          <Tag
            key={tag}
            className="bg_primary_mid text_primary_dark"
          >{`#${tag}`}</Tag>
        ))}
      </div>
      <Text
        className="text_primary_dark text_regular_bold"
        style={{
          position: "absolute",
          bottom: "0em",
          marginTop: "1em",
        }}
      >
        {`Room by ${room.hostId.name}`}
      </Text>
      <div
        style={{
          position: "absolute",
          display: "flex",
          right: "2em",
          bottom: "-2em",
        }}
      >
        <Image
          style={{
            border: "solid 0.3em #EFE3CA",
          }}
          width={64}
          className="profile_img"
          src={room.hostId.avatar}
          alt="host avatar"
          preview={false}
          onClick={() => navigate(`/profile/${room.hostId.id}`)}
        />
      </div>
    </div>
  );
  const CardFooter = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2em",
        borderRadius: "0px 0px 8px 8px",
      }}
      className="bg_primary_mid"
    >
      <Text
        className="text_primary_dark text_medium_bold"
        style={{ marginBottom: "1em" }}
      >
        <UserOutlined />
        {`  ${room.speakers.length} participants`}
      </Text>
      <Row justify="center" align="middle">
        <Col flex={2}>
          <div>
            {room.speakers.slice(0, 2).map((speaker) => (
              <Image
                key={speaker.id}
                width={35}
                className="profile_img"
                src={speaker.avatar}
                alt="speaker avatar" 
                preview={false}
                onClick={() => navigate(`/profile/${speaker.id}`)}
              />
            ))}
          </div>
        </Col>

        <Col flex={5} className="profile_text">
          {room.speakers.length - 2 > 0 && (
            <Text className="text_primary_dark text_regular_bold">
              {`+${room.speakers.length - 2} other speeker`}
            </Text>
          )}
        </Col>
        <Col flex={3} className="profile_text">
          <Button className="bg_primary text_white blue_btn" onClick={goToRoom}>
            Join in
          </Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <Card className="theme_card">
      <CardHeader />
      <CardFooter />
    </Card>
  );
};

export default RoomCard;
