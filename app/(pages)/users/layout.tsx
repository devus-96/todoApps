import { GlobalErrorComponent } from "@/components/global/globalErrorComponent";
import SideBar from "@/components/users/sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-full overflow-x-hidden">
          <SideBar />
          <div className="w-full min-h-screen flex items-center justify-between">
            <div className="w-[220px] h-screen"></div>
            <div className="w-[calc(100%-200px)] min-h-screen overflow-auto flex flex-col">
              <GlobalErrorComponent />
              {children}
            </div>
          </div>
      </div>
  );
}