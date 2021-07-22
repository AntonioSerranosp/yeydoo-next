import React, { useState } from "react";
import { CustomLayout } from "../components/layout/Layout";
import { Modal, Button, Form, Input, InputNumber, message } from "antd";

export default function NewProduct() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || "";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const newProduct = async (values) => {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(values),
    });

    return response.json();
  };
  const handleFinish = async (values) => {
    console.log(values);
    const userValues = {
      ...values,
      role,
    };
    if (!role) {
      message.error("No cuenta con los permisos necesarios");
      return;
    }
    const product = await newProduct(userValues).then((data) => {
      console.log(data, "data del nuevo producto");

      return data;
    });
    if (product.message) {
      message.error(product.message);
      setIsModalVisible(false);
      return;
    }
    if (product.id) {
      message.success("This is a success message");
      handleOk();
    }
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <CustomLayout>
        <h1>Nuevo Producto</h1>
        <div>
          <Button type="primary" onClick={showModal}>
            Crear un nuevo producto
          </Button>
          <Modal
            title="Creat producto"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={handleFinish}
              //   onValuesChange={onFormLayoutChange}
            >
              <Form.Item label="Name" name="name">
                <Input placeholder="nombre del producto" />
              </Form.Item>
              <Form.Item label="SKU" required={true} name="sku">
                <Input placeholder="SKU" />
              </Form.Item>
              <Form.Item label="Cantidad" name="quantity">
                <InputNumber min={1} max={100000} />
              </Form.Item>
              <Form.Item label="Precio" name="price">
                <InputNumber
                  min={0}
                  defaultValue={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </CustomLayout>
    </div>
  );
}
