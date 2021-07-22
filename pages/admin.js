import React from "react";
import { CustomLayout } from "../components/layout/Layout";
import { Modal, Button, Card, Input, Space, Col, Checkbox } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Search } = Input;
export default function Admin() {
  const onSearch = (value) => console.log(value);
  const options = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];
  return (
    <div>
      <CustomLayout>
        <h1>Pagina de administrador</h1>
        <div>
          <Search
            placeholder="Buscar producto"
            onSearch={onSearch}
            enterButton
          />

          <Col span={10}>
            <h2>Por vendedor</h2>
            <Checkbox value="A">Vendeor 1</Checkbox>
            <Checkbox value="A">Vendedor 2</Checkbox>
            <Checkbox value="A">Vendedor 3</Checkbox>
          </Col>
        </div>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Titulo del producto" description="www.instagram.com" />
          <p>Cantidad: n cantidad</p>
          <p>Precio: n precio</p>
        </Card>
        ,
      </CustomLayout>
    </div>
  );
}
