"use client";
import SideBar from "@/components/SideBar";
import React from "react";

const Homelayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <SideBar>{children}</SideBar>
    </div>
  );
};

export default Homelayout;
