import SideBar from "@/components/teams/sidebar";
import { Popup } from "@/components/task/popup";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
          <SideBar />
          <Popup />
          {children}
      </div>
  );
}
