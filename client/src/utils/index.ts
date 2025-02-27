import { User } from "@/types/User";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserId(user?: User | null) {
  if (user) return user._id;
  let guestId = localStorage.getItem("user");
  if (!guestId) {
    guestId = Math.random().toString(36).substring(7);
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
}
