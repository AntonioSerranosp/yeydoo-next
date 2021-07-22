import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { CustomLayout } from "../components/layout/Layout";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Typography,
  Result,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { startLogin } from "../actions/auth";
import { types } from "../types/types";

const { Paragraph, Text } = Typography;
const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [form] = Form.useForm();
  const [loginerror, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [erorrText, setErrorText] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const login = async (values) => {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    return response.json();
  };

  const handleFinish = async (values) => {
    const { email, password } = values;
    // let data;
    const loginUser = await login(values).then((data) => {
      return data;
    });

    if (loginUser.statusCode) {
      console.log("existe un error");
      setErrorText(loginUser.message);
      setLoginError(true);
      handleOk();
      return;
    }
    if (loginUser.token) {
      console.log("entro en el setlocal");
      localStorage.setItem("token", loginUser.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      localStorage.setItem("role", loginUser.role);
      dispatch(
        dispatchLogin({
          name: loginUser.name,
          email: loginUser.email,
        })
      );
    }
    handleOk();
    router.push("/");
  };
  const dispatchLogin = (user) => ({
    type: types.authLogin,
    payload: user,
  });
  return (
    <CustomLayout>
      {loginerror ? (
        <Result
          status="error"
          title="Login Failed"
          subTitle={erorrText}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => router.push("/")}
            >
              <Link href="/login">Go home</Link>
            </Button>,
            <Button key="tryagain" onClick={showModal}>
              Try Again
            </Button>,
          ]}
        />
      ) : null}
      <Modal
        title="Acceder a cuenta"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ htmlType: "submit" }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item label="Correo" name="email">
            <Input placeholder="correo" />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            required={true}
            rules={[{ required: true, message: "Please input your Password!" }]}
            name="password"
          >
            <Input.Password
              placeholder="Input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </CustomLayout>
  );
};

export default Login;
