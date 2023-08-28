import LoginImg from "@/assets/images/login.jpg";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import { useLoginStore } from "@/store";
export function Login() {
  const { userInfo } = useLoginStore();
  return (
    <div className="flex h-100vh">
      <div className="w-3/10 bg-gray-300 hidden lg:block">
        <img className="vertical-top w-full h-full" src={LoginImg} alt="" />
      </div>
      <div className="w-100% flex-center lg:w-7/10">
        <div className="w-350px">
          <div className="font-bold text-18px">欢迎到来</div>
          <div className="my-4 text-14px">
            <span>还没有账号 ? </span>
            <span>立即注册</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

const LoginForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { getUserInfo } = useLoginStore();
  const onFinish = async (values: any) => {
    try {
      await getUserInfo(values);
      messageApi.success("登录成功");
    } catch (error) {
      messageApi.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        layout="vertical"
        initialValues={{ remember: true, layout: "vertical" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }}
        >
          <div className="w-full flex justify-between">
            <Checkbox>记住我</Checkbox>
            <span>忘记密码 ?</span>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <div>
            <Button type="primary" block size="large" htmlType="submit">
              立即登录
            </Button>
            <Divider>
              <span className="text-14px color-#969696">或者</span>
            </Divider>
            <Button type="primary" block size="large" htmlType="submit">
              Github
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
