"use client";

import React from "react";
import UserDropdown from "./dropdown";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();


  return (
    <div className="p-4 sticky top-0 w-full flex flex-row justify-end">
      {pathname !== "/login" ? <UserDropdown /> : <></>}
    </div>
  );
}
