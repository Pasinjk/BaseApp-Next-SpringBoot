"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { userStore } from "@/stores/user.store";

export default function UserDropdown() {
  const username = userStore((state) => state.username());
  const shortName = userStore((state) => state.shortName());

  //TODO Click logout will reset all

  return (
    <div className="pr-5 flex flex-row items-center">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{ name: `${shortName}` }}
            name={`${username}`}
            description={`${shortName}` + "." + `${username}`}
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
