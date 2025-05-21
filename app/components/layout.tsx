import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen relative">
      <Header
        toggleSidebar={() => {
          if (window.innerWidth <= 425) {
            setMobileSidebarOpen((prev) => !prev); // toggle mobile sidebar
          } else {
            setSidebarVisible((prev) => !prev);
          }
        }}
        sidebarVisible={sidebarVisible}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar para telas grandes */}
        <Sidebar isOpen={sidebarVisible} />
        {/* Sidebar móvel sempre renderizado, mas controlado por isOpen */}
        <Sidebar
          isMobile
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Overlay móvel só aparece quando sidebar aberto */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-auto bg-[#2A2A2A]">
          {children}
        </main>
      </div>
    </div>
  );
}
