import { StateCreator } from "zustand";
import { userInsterface } from "../interface/user.insterface";
import { User } from "@/types/user.type";

export const userSlice: StateCreator<userInsterface> = (set, get) => ({

  user: null,

  setUser: (user: User) => {
    set({ user });
  },

  username: () => {
    const user = get().user;
    return user ? `${user.firstName}` : "Guest";
  },

  shortName: () => {
    const user = get().user;
    return user ? `${user.lastName.charAt(0).toUpperCase()}` : "";
  },

  isAdmin: () => {
    const user = get().user;
    return user ? user.is_admin : false;
  },

  isActive: () => {
    const user = get().user;
    return user ? user.is_active : false;
  },
});
