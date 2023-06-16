import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "antd";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getAllRooms } from "../../http";
import Layout from "../../layout/Layout/Index";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../components/MessageBox/MessageBox";
import ChatBox from "../../components/ChatBox/ChatBox";
import { roomModalVisible } from "../../store/roomModalSlice";

const Message = () => {

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     const { data } = await getRooms();
  //     setRooms(data);
  //   };
  //   fetchRooms();
  // }, []);

  return (
    <>
      <Layout>
        <div
          style={{
            margin: "2em",
            border: "2px #efe3ca solid",
            height: "90vh"
          }}
        >
          <Row>
            <Col xs={24} sm={24} md={8} lg={6} xl={6}>
              <MessageBox />
            </Col>
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <ChatBox />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default Message;
