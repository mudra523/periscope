import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { createRoom as create } from "../../http";
// import Button from "../shared/Button/Button";
import styles from "./AddRoomModal.module.css";

const AddRoomModal = ({ onClose, onOpen }) => {
  const navigate = useNavigate();
  const roomType = "public";

  async function onFinish(values) {
    try {
      if (!values) return;
      console.log("Success:", values);
      const { data } = await create(values);

      console.log("data", data);
      navigate(`/room/${data.id}`);
    } catch (err) {
      console.log(err);
    }
    onClose();
  }

  return (
    <Modal
      title="Start a room"
      open={onOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={false}
    >
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Enter the topic of discussion"
          name="topic"
          rules={[
            {
              required: true,
              message: "Please enter the topic of discussion",
            },
            {
              max: 50,
              message: "Max 50 letters allowed",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tags for the topic"
          name="tags"
          rules={[
            {
              required: true,
              message: "Please add tags of discussion",
            },
            // {
            //   whitespace: true,
            //   message: "White-space are not allowed.",
            // },
            // {
            //   pattern: /^[a-z0-9]+/,
            //   message: "Only small characters and numbers allowed",
            // },
            // {
            //   max: 11,
            //   message: "Max 11 letters allowed",
            // },
          ]}
        >
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            // onChange={handleChange}
            tokenSeparators={[","]}
            options={[]}
          />
        </Form.Item>
        <Form.Item name="roomType" label="Select room type">
          <Radio.Group size="large">
            <Radio.Button value="public">Public</Radio.Button>
            <Radio.Button value="private">Private</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            type="primary"
            className="text_black theme_btn"
            style={{ width: "100%", marginTop: "1em" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
