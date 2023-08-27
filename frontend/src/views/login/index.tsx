import LoginImg from "@/assets/images/login.jpg";
import { Button, Checkbox, Divider, Form, Input } from "antd";
export function Login() {
  return (
    <div className="flex h-100vh">
      <div className="w-3/10 bg-gray-300 hidden lg:block">
        <img className="vertical-top w-full h-full" src={LoginImg} alt="" />
      </div>
      <div className="w-100% lg:w-7/10 bg-gray-100">
        <h3>欢迎到来</h3>
        <div>
          <span>还没有账号 ? </span>
          <span>立即注册</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const LoginForm: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <div>
        <Checkbox>Remember me</Checkbox>
        <span>忘记密码 ?</span>
      </div>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <div>
        <Button type="primary" block htmlType="submit">
          立即登录
        </Button>
        <Divider>或者</Divider>
        <Button type="primary" block htmlType="submit">
          Github
        </Button>
      </div>
    </Form.Item>
  </Form>
);
