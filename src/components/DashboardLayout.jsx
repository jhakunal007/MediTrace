import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="main-wrapper">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
