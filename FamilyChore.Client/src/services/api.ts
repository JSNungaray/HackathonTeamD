import { User, Chore, ChoreAssignment, ChoreWithDetails, UserWithChores } from '../models/types';

// Base API URL - adjust this based on your backend configuration
// Using the default ASP.NET Core port for development
const API_BASE_URL = 'https://localhost:7080';

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API error: ${response.status}`);
  }
  
  // Check if there's content to parse
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json') && response.status !== 204) {
    return response.json();
  }
  
  return null;
};

// User API calls
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/User/GetUserList`);
    return handleResponse(response);
  },
  
  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/User/GetUserById?id=${id}`);
    return handleResponse(response);
  },
  
  getByName: async (userName: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/User/GetUserByName?username=${encodeURIComponent(userName)}`);
    return handleResponse(response);
  },
  
  add: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/User/AddUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return handleResponse(response);
  },
  
  update: async (user: User): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/User/UpdateUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return handleResponse(response);
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/User/DeleteUser?id=${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Chore API calls
export const choreApi = {
  getAll: async (): Promise<Chore[]> => {
    const response = await fetch(`${API_BASE_URL}/Chores/GetChoreList`);
    return handleResponse(response);
  },
  
  getById: async (id: number): Promise<Chore> => {
    const response = await fetch(`${API_BASE_URL}/Chores/GetChoreById?id=${id}`);
    return handleResponse(response);
  },
  
  getByName: async (choreName: string): Promise<Chore> => {
    const response = await fetch(`${API_BASE_URL}/Chores/GetChoreByName?choreName=${encodeURIComponent(choreName)}`);
    return handleResponse(response);
  },
  
  add: async (chore: Omit<Chore, 'id'>): Promise<Chore> => {
    const response = await fetch(`${API_BASE_URL}/Chores/AddChore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chore),
    });
    return handleResponse(response);
  },
  
  update: async (chore: Chore): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/Chores/UpdateChore`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chore),
    });
    return handleResponse(response);
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/Chores/DeleteChore?id=${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Chore Assignment API calls
export const choreAssignmentApi = {
  getAll: async (): Promise<ChoreAssignment[]> => {
    const response = await fetch(`${API_BASE_URL}/Admin/GetAssignmentList`);
    return handleResponse(response);
  },
  
  getById: async (id: number): Promise<ChoreAssignment> => {
    const response = await fetch(`${API_BASE_URL}/Admin/GetAssignmentById?id=${id}`);
    return handleResponse(response);
  },
  
  getByUserId: async (userId: number): Promise<ChoreAssignment[]> => {
    const response = await fetch(`${API_BASE_URL}/Admin/GetAssignmentsByUserId?userId=${userId}`);
    return handleResponse(response);
  },
  
  add: async (assignment: Omit<ChoreAssignment, 'id'>): Promise<ChoreAssignment> => {
    const response = await fetch(`${API_BASE_URL}/Admin/AddChoreAssignment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignment),
    });
    return handleResponse(response);
  },
  
  update: async (assignment: ChoreAssignment): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/Admin/UpdateAssignment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignment),
    });
    return handleResponse(response);
  },
  
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/Admin/DeleteAssignment?id=${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Helper function to get chores with user details
export const getChoresWithDetails = async (): Promise<ChoreWithDetails[]> => {
  const [chores, assignments, users] = await Promise.all([
    choreApi.getAll(),
    choreAssignmentApi.getAll(),
    userApi.getAll()
  ]);
  
  return chores.map(chore => {
    const assignment = assignments.find(a => a.choreId === chore.id);
    const user = assignment ? users.find(u => u.id === assignment.userId) : undefined;
    
    return {
      ...chore,
      assignedTo: user,
      status: assignment?.choreStatus
    };
  });
};

// Helper function to get users with their assigned chores
export const getUsersWithChores = async (): Promise<UserWithChores[]> => {
  const [users, choresWithDetails] = await Promise.all([
    userApi.getAll(),
    getChoresWithDetails()
  ]);
  
  return users.map(user => {
    const assignedChores = choresWithDetails.filter(chore => 
      chore.assignedTo && chore.assignedTo.id === user.id
    );
    
    return {
      ...user,
      assignedChores: assignedChores.length > 0 ? assignedChores : undefined
    };
  });
}; 