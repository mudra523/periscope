import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../http";
import { updateUser } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
const { TextArea } = Input;


const EditeProfile = ({ onClose, onOpen }) => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUser(userId);
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  async function onFinish (values) {
    console.log("values", values)
    try {
      if (!values) return;
      const { data } = await updateUser({userData: values});
      onClose(false)
      // dispatch(setAuth({user:data}));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title="Edit your data"
      open={onOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={false}
    >
      {
        user == null ? (<div>Wait</div>):(
          <Form
            name="basic"
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              name: user?.name,
              location: user?.location,
              occupation: user?.occupation,
              bio: user?.bio,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div>Your name:</div>
            <Form.Item
              name="name"
              noStyle
              rules={[
                {
                  required: false,
                  message: "Please enter the name",
                }
              ]}
            >
              <Input />
            </Form.Item>
            <div>Location:</div>
            <Form.Item
              name="location"
              noStyle
              rules={[
                {
                  required: false,
                  message: "Please enter the location",
                }
              ]}
            >
              <Input />
            </Form.Item>
            <div>Occupation:</div>
            <Form.Item
              name="occupation"
              noStyle
              rules={[
                {
                  required: false,
                  message: "Please enter the occupation",
                } 
              ]}
            >
              <Input />
            </Form.Item>
            <div>Bio:</div>
            <Form.Item
              name="bio"
              noStyle
              rules={[
                {
                  required: false,
                  message: "Please enter the biodata",
                }
              ]}
            >
              <TextArea />
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
                Save
              </Button>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};

export default EditeProfile;