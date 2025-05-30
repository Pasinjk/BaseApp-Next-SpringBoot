"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";

export default function UserDropdown() {
    // TODO import user store and set it in dropdown

  return (
    <div className="pr-5 flex flex-row items-center">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              src: "https://i.pravatar.cc/150?img=3",
            }}
            name="John Doe"
            description="Admin"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="user actions" variant="flat">
          <DropdownItem key="profile">Profile</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
