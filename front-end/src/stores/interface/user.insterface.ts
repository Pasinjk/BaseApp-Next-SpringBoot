
import { User } from "@/types/user.type";

export interface userInsterface {
  user: User | null;

  username: () => string;
  shortName: () => string;
  isAdmin: () => boolean;
  isActive: () => boolean;

  setUser: (user: User) => void;
}
