import SidebarProject from "@/components/global/sidebarProject";
import SideBar from "@/components/teams/sidebar";
import Routine from "@/components/ui/routine";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-full overflow-x-hidden">
          <SideBar />
          <SidebarProject />
          <div className="w-full min-h-screen flex items-center justify-between">
            <div className="w-[220px] h-screen"></div>
            {children}
          </div>
      </div>
  );
}
