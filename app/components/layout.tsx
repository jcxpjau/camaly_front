import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import useIsMobile from "../hooks/useIsMobile"; // ajuste o path se necessário

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile(768);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarVisible((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Header toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />

      <div className="flex flex-1 overflow-hidden">
        {isMobile ? (
          <>
            <Sidebar
              isMobile
              isOpen={mobileSidebarOpen}
              onClose={() => setMobileSidebarOpen(false)}
            />
            {mobileSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMobileSidebarOpen(false)}
              />
            )}
          </>
        ) : (
          <Sidebar isOpen={sidebarVisible} />
        )}

        <main className="flex-1 overflow-auto bg-[#2A2A2A]">
          {children}
        </main>
      </div>
    </div>
  );
}
