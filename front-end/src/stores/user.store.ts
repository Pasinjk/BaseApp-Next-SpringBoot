import { create } from "zustand";
import { userInsterface } from "./interface/user.insterface";
import { userSlice } from "./slice/user.slice";



export const userStore = create<userInsterface>((...args) => ({
  ...userSlice(...args),
}));
