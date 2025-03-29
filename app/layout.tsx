import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {PopupContextProvider} from "@/hooks/usePopup";
import React from "react";
import { InvitationPopUp } from "@/components/popup/invitationPopup";
import { TaskPopUp } from "@/components/popup/taskPopup";
import { CalendarPopUp } from "@/components/popup/calendarPopup";
import ConnectContextProvider from "@/hooks/useConnect";
import { ClockPopUp } from "@/components/popup/clockPopup";

const jetBrainsMono = localFont({
  src: "./fonts/woff/JetBrainsMono-Regular.woff",
  variable: "--font-jetBrains-mono",
  weight: "100 900",
})

const jetBrainsMonoBold = localFont({
  src: "./fonts/woff/JetBrainsMono-Bold.woff",
  variable: "--font-jetBrainsBold-mono",
  weight: "100 900",
})

const jetBrainsMonoExtraBold = localFont({
  src: "./fonts/woff/JetBrainsMono-ExtraBold.woff",
  variable: "--font-jetBrainsExtraBold-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} ${jetBrainsMonoBold.variable} ${jetBrainsMonoExtraBold.variable} antialiased`}
      >
        <ConnectContextProvider>
        <PopupContextProvider>
          <TaskPopUp />
          <CalendarPopUp />
          <ClockPopUp />
          <InvitationPopUp />
          {children}
        </PopupContextProvider>
        </ConnectContextProvider>
      </body>
    </html>
  );
}
