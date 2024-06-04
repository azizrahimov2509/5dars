import React from "react";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
