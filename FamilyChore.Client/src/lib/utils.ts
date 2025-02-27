import { User } from "@/App";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/User/GetUserList`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API Response:', data);

    if (!Array.isArray(data)) {
      console.error('Expected array of users, received:', typeof data);
      return [];
    }

    return data.map((user: User) => ({
      id: user.id,
      userName: user.userName,
      userType: user.userType
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    console.log('Response details:', {
      url: `${import.meta.env.VITE_API_URL}/User/GetUserList`,
      error
    });
    return [];
  }
};
