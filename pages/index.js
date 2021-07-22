import Head from "next/head";
import Image from "next/image";
import { CustomLayout } from "../components/layout/Layout";
// import { Sidebar } from "../components/layout/Sidebar";
// import { Layout, Menu, Breadcrumb } from "antd";

// import styles from "../styles/Home.module.css";
// const { Header, Content, Footer, Sider } = Layout;
export default function Home() {
  return (
    <div>
      <CustomLayout>
        <h1> INICIO</h1>
      </CustomLayout>
    </div>
  );
}
