import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
