import React, { useState } from "react";
import { useLoginStore } from "@/store";
import { updateAvatar } from "@/services";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import WrappedRoutes from "@/router";
import {
  Button,
  Avatar,
  Card,
  Layout,
  Menu,
  theme,
  Modal,
  Upload,
  Popover,
} from "antd";
import type { MenuProps } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    label: "Navigation One",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "Navigation Two",
    key: "app",
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: "alipay",
  },
];

const Dashboard: React.FC = () => {
  const { userInfo, getUserInfoData } = useLoginStore();
  const [current, setCurrent] = useState("mail");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(true);
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );
  const [fileList] = useState<UploadFile[]>([]);

  const content = (
    <div className="flex items-center justify-center flex-col w-200px">
      <div className="mb-4 font-bold text-18px uppercase">
        {userInfo.username ?? "未登录"}
      </div>
      {/* <Avatar
        src={
          userInfo.avatar ? <img src={userInfo.avatar} alt="avatar" /> : null
        }
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        icon={!userInfo.avatar && <UserOutlined />}
      /> */}
      <Upload
        listType="picture-circle"
        fileList={fileList}
        // onChange={handleChange}
        customRequest={customRequest}
      >
        <div className="flex items-center h-full w-full justify-center">
          {done ? (
            userInfo?.avatar?.length ? (
              <img
                className="w-full h-full b-rd-50% object-cover"
                src={userInfo?.avatar}
                alt="avatar"
              />
            ) : (
              uploadButton
            )
          ) : (
            uploadButton
          )}
        </div>
      </Upload>

      <p>Content</p>
      <p>Content</p>
    </div>
  );

  async function customRequest(file) {
    setDone(false);
    console.log(file);
    setLoading(true);
    const formData = new FormData();
    formData.set("file", file.file);
    const res = await updateAvatar(formData);
    getUserInfoData();
    console.log(res);
    setLoading(false);
    setDone(true);
  }
  return (
    <Layout className="h-100vh">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[
            UserOutlined,
            VideoCameraOutlined,
            UploadOutlined,
            UserOutlined,
          ].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between items-center"
        >
          <div></div>
          <div className="px-6 align-right">
            <Popover placement="bottom" content={content} trigger="click">
              <Avatar
                src={
                  userInfo.avatar ? (
                    <img src={userInfo.avatar} alt="avatar" />
                  ) : null
                }
                size={36}
                icon={!userInfo.avatar && <UserOutlined />}
              />
            </Popover>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Card className="h-full" bordered={false}>
            {/* <WrappedRoutes /> */}
            <img
              className="w-full h-full object-cover"
              src={userInfo.avatar}
              alt=""
            />
            <Button type="primary">Primary Button</Button>
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
