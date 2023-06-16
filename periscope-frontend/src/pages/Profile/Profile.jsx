import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, followUser, unFollowUser } from "../../http";
import { Row, Col, Image, Typography, Button, Avatar } from "antd";
import "./Profile.css";
import Layout from "../../layout/Layout/Index";
import Loader from "../../components/shared/Loader/Loader";
import EditeProfile from "../../components/EditeProfile/EditeProfile";
import UserProfile from "../../components/UserProfile/UserProfile";
import {
  EnvironmentOutlined,
  ShoppingFilled,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { setAuth } from "../../store/authSlice";

const { Text } = Typography;

const Home = () => {
  const authUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [socialUser, setSocialUser] = useState("followers");
  const [inFollowingList, setinFollowingList] = useState(false);

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const { data } = await getUser(userId);
    console.log("OIUYT", userId)
    setUser(data);
    setinFollowingList(data?.followers?.some((u) => u.id === authUser.id))
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  function hideEditModal() {
    setIsEdit(false);
    fetchUser();
  }

  function showEditModal() {
    setIsEdit(true);
  }

  async function followingState() {
    if (!user.id) return;
    try {
      if(inFollowingList){
        // Unfollow actions
        // const followingList = user?.followers?.filter((u) => u.id !== authUser.id);
        // user.followers = followingList;
        // setUser(user)
        
        await unFollowUser({unFollowingId : userId});
        const authUserUpdated = JSON.parse(JSON.stringify(authUser));
        authUserUpdated.following = authUserUpdated?.following?.filter((u) => u.id !== user.id);
        dispatch(setAuth({user: authUserUpdated}));
        fetchUser();
      }else{
        // Follow actions
        // const followerList = user.followers.push(JSON.parse(JSON.stringify(authUser)))
        // user.followers = followerList;
        // setUser(user);

        await followUser({followingId: userId});
        const authUserUpdated = JSON.parse(JSON.stringify(authUser));
        authUserUpdated.following.push(user);
        dispatch(setAuth({user: authUserUpdated}));
        fetchUser();
      }
      setinFollowingList(!inFollowingList)
      // navigate(`/profile/${user.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  // const found = user?.following?.some((u) => u.id === userId);
  // console.log("found", found);

  // ui elements
  const LoadingElement = () => (
    <div className="loadingWrap">
      <Loader message="Setting things up" />
    </div>
  );
  return (
    <Layout>
      {user === null ? (
        <LoadingElement />
      ) : (
        <Row>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={16}
            xl={16}
            style={{ padding: "1em" }}
          >
            <Profile user={user} />
            {user?.bio && (
              <Row style={{ marginBottom: "1em" }}>
                <Text className="text_primary " style={{ fontSize: "16px" }}>
                  {user?.bio}
                </Text>
              </Row>
            )}
            {userId === authUser?.id && (
              <Row>
                <Button
                  size="large"
                  className="pointer bg_primary text_white blue_btn"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </Button>
              </Row>
            )}
            {userId !== authUser?.id && (
              <Row>
                <div
                  className="pointer active_radio"
                  onClick={followingState}
                >
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {inFollowingList ? <UserDeleteOutlined /> : <UserAddOutlined />}
                  </span>
                  {inFollowingList ? " Unfollow" : " Follow"}
                </div>
              </Row>
            )}
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={8}
            className="bg_secondary"
            style={{ height: "100vh" }}
          >
            <div style={{ padding: "1.5em" }}>
              <div className="pointer custom_radio">
                <div
                  className={`${
                    socialUser === "followers"
                      ? "active_radio"
                      : "inactive_radio"
                  }`}
                  onClick={() => setSocialUser("followers")}
                >
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {user?.followers?.length}
                  </span>{" "}
                  Followers
                </div>
                <div
                  className={`${
                    socialUser === "following"
                      ? "active_radio"
                      : "inactive_radio"
                  }`}
                  onClick={() => setSocialUser("following")}
                >
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {user?.following?.length}
                  </span>{" "}
                  Following
                </div>
              </div>
              <div style={{ marginTop: "2em" }}>
                {socialUser === "followers" &&
                  user?.followers &&
                  user?.followers?.map((user) => (
                    <UserProfile key={user.id} user={user} />
                  ))}
                {socialUser === "following" &&
                  user?.following &&
                  user?.following?.map((user) => (
                    <UserProfile key={user.id} user={user} />
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      )}
      {isEdit && (
        <EditeProfile onClose={hideEditModal} onOpen={showEditModal} />
      )}
    </Layout>
  );
};

export default Home;

const Profile = ({ user }) => (
  <Row
    justify="center"
    align="middle"
    style={{ marginBottom: "2em", marginTop: "1em" }}
  >
    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
      <div>
        {user?.avatar ? (
          <Image width={180} className="profile_img" src={user?.avatar} />
        ) : (
          <Avatar />
        )}
      </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={16} xl={16} className="profile_text">
      {user?.name && (
        <Text className="text_primary text_bold" style={{ fontSize: "32px" }}>
          {user?.name}
        </Text>
      )}
      {user?.location && (
        <Text
          className="text_gray text_regular_bold"
          style={{ fontSize: "16px" }}
        >
          <EnvironmentOutlined />
          &nbsp;&nbsp;{user?.location}
        </Text>
      )}
      {user?.occupation && (
        <Text
          className="text_gray text_regular_bold"
          style={{ fontSize: "16px" }}
        >
          <ShoppingFilled />
          &nbsp;&nbsp;{user?.occupation}
        </Text>
      )}
    </Col>
  </Row>
);