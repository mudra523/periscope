import React, { useState } from "react";
import { Row, Col, Input, Typography, Form } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import styles from "./ChatBox.module.css";

const { Search } = Input;
const { Text } = Typography;

const ChatBox = () => {
  const authUser = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState([]);
  // const { following } = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  
  const sendMessage = (e) => {
    const obj = {
      userId: authUser.id,
      message: e.target.value,
    };
    setMessage((current) => [...current, obj]);
    form.resetFields();
  };

  return (
    <div className={styles.message_box}>
      <div className={styles.message_inside}>
        <div className={styles.message_scroll}>
          {message?.map((e) =>
            e.userId === authUser.id ? (
              <div className={styles.send_msg}>
                <Text className={styles.send_chat}>{e.message}</Text>
              </div>
            ) : (
              <div className={styles.recive_msg}>
                <Text className={styles.recive_chat}>{e.message}</Text>
              </div>
            )
          )}
        </div>
        <div className={styles.chat_nput}>
          <Form form={form}>
            <Form.Item name="name">
              <Input placeholder="Hey" onPressEnter={sendMessage} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
