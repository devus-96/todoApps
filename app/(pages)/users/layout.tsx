import SideBar from "@/components/users/sidebar";
import { Popup } from "@/components/task/popup";
import TaskContextProvider from "@/hooks/useTask";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <TaskContextProvider>
          <SideBar />
          <Popup />
          {children}
        </TaskContextProvider>
      </div>
  );
}
