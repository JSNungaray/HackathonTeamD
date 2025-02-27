import { User } from "@/App";
import { Chore } from "@/components/Chore";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// send api request
const sendRequest = async (method: string, uri: string, data?: any) => {
  if (data == null) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${uri}`);
    return response;
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${uri}`, { 
    method: method,
    body: JSON.stringify(data)
  });
  return response;
}

// chore api functions
export const fetchChores = async (): Promise<Chore[]> => {
  const choresResponse = await sendRequest('GET', 'Chores/GetChoreList');
  const assignmentsResponse = await sendRequest('GET', 'Admin/LoadAssignmentList');
  
  const chores = await choresResponse.json();
  const assignmentsList = await assignmentsResponse.json();

  const assignments = await Promise.all(assignmentsList.map(async (assignment: any) => ({
    ...assignment,
    user: await GetUserById(assignment.userId)
  })));
  
  return chores.map((chore: any) => ({
    ...chore,
    ChoreAssignment: assignments.find((assignment: any) => assignment.choreId === chore.id)
  }));
}


// user api functions
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await sendRequest('GET', 'User/GetUserList');
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

export const SaveUser = async (user: User) => {
  var response = null;
  if (user.id == null) {
    response = await sendRequest('POST', 'User/AddUser', user);
  } else {
    response = await sendRequest('PUT', 'User/UpdateUser', user);
  }
  return response;
}

export const DeleteUser = async (id: number) => {
  return await sendRequest('DELETE', `User/DeleteUser?id=${id}`);
}

export const GetUserById = async (id: number) => {
  const response = await sendRequest('GET', `User/GetUserById?id=${id}`);
  const data = await response.json();
  return data.map((user: User) => ({ id: user.id, userName: user.userName, userType: user.userType }));
}
