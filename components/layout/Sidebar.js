import React from "react";
import Link from "next/link";
import styles from "./sidebar.module.css";

export const Sidebar = () => {
  return (
    <nav className={styles.nav}>
      <input className={styles.input} placeholder="Search..." />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/newProduct">
        <a>Crear nuevo productos</a>
      </Link>
      <Link href="/admin">
        <a>Administrador</a>
      </Link>
    </nav>
  );
};
