// Libs
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

// Utils
import { login, LoginRequest } from "../../api/services";

import "./login-form.scss";

export const LoginForm: React.FunctionComponent = () => {
  const [form] = Form.useForm<LoginRequest>();
  const navigate = useNavigate();

  const onFinish = async (values: LoginRequest) => {
    const response = await login(values);
    if (response.status === 200) {
      const token = await response.json();
      console.log(token);
      navigate("/admin/pregled");
    } else onFinishFailed("Error");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form">
      <Form
        name="basic"
        form={form}
        labelAlign="left"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="korisnickoIme"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="lozinka"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
