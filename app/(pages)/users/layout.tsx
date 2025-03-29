import SideBar from "@/components/users/sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
          <SideBar />
          {children}
      </div>
  );
}
