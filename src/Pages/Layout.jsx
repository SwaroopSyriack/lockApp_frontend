import React, { useState } from 'react';
import SideNav from '../components/Sidebar/SideNav';
import { Outlet } from 'react-router-dom';

function Layout() {
    const [isadmin , setIsadmin] = useState(true)
  return (
    <div className="flex min-h-screen text-on-surface">
      <SideNav admin = {isadmin} />
      <main className="ml-64 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;