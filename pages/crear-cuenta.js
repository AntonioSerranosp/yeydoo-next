import React, { useState } from "react";
import { CustomLayout } from "../components/layout/Layout";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  Result,
  message,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { fetchSinToken } from "../helpers/fetch";
const CrearCuenta = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [registerError, setRegisterError] = useState(false);
  const [erorrText, setErrorText] = useState("");

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // setConfirmLoading(true);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const crearUsuario = async (values) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return response.json();
  };
  const handleFinish = async (values) => {
    const { name, email, password, password2, role } = values;
    let data;
    if (password !== password2) {
      console.log("las contraseñas no son iguales");
      return;
    }

    const newUser = await crearUsuario(values).then((data) => {
      console.log(data, "parse?");
      return data;
    });
    console.log(newUser, "objeto respuesta ?");
    if (newUser.statusCode) {
      console.log("existe un error");
      setErrorText(newUser.message);
      setRegisterError(true);
      handleOk();
    }
    if (newUser.token) {
      console.log("entro en el setlocal");
      localStorage.setItem("token", newUser.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      localStorage.setItem("role", newUser.role);
      dispatch(
        dispatchLogin({
          name: newUser.name,
          email: newUser.email,
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
    <>
      <CustomLayout>
        <div>pagina para crear cuenta</div>
        {registerError ? (
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
          title="Crear Nueva Cuenta"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ htmlType: "submit" }}
          confirmLoading={confirmLoading}
          footer={null}
        >
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <Form.Item label="Nombre" name="name">
              <Input placeholder="nombre del usuario" />
            </Form.Item>
            <Form.Item label="Correo" name="email">
              <Input placeholder="correo" />
            </Form.Item>
            <Form.Item label="Select" name="role">
              <Select>
                <Select.Option value="comprador">Comprador</Select.Option>
                <Select.Option value="admin">Administrador</Select.Option>
                <Select.Option value="vendor">Vendedor</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Contraseña"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              name="password"
            >
              <Input.Password
                placeholder="Input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label="Verifica la contraseña"
              required={true}
              name="password2"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                placeholder="input password"
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
    </>
  );
};
export default CrearCuenta;
