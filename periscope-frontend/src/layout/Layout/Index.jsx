import React from "react";
import { Layout } from "antd";
import LeftNavBar from "./Sider";
import styles from "./Layout.module.css";

const { Content, Sider } = Layout;

const Index = ({ children }) => {
  return (
    <Layout className={styles.main_layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ padding: "0.5em" }}
        className="bg_secondary"
        width={290}
      >
        <LeftNavBar />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

export default Index;
