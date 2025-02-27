import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Chore, ChoreAssignment, ChoreWithDetails, UserWithChores } from '../models/types';
import { userApi, choreApi, choreAssignmentApi, getChoresWithDetails, getUsersWithChores } from './api';

interface ApiContextType {
  // Data
  users: User[];
  chores: Chore[];
  assignments: ChoreAssignment[];
  choresWithDetails: ChoreWithDetails[];
  usersWithChores: UserWithChores[];
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Refresh functions
  refreshUsers: () => Promise<void>;
  refreshChores: () => Promise<void>;
  refreshAssignments: () => Promise<void>;
  refreshAll: () => Promise<void>;
  
  // User operations
  addUser: (user: Omit<User, 'id'>) => Promise<User>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  
  // Chore operations
  addChore: (chore: Omit<Chore, 'id'>) => Promise<Chore>;
  updateChore: (chore: Chore) => Promise<void>;
  deleteChore: (id: number) => Promise<void>;
  
  // Assignment operations
  addAssignment: (assignment: Omit<ChoreAssignment, 'id'>) => Promise<ChoreAssignment>;
  updateAssignment: (assignment: ChoreAssignment) => Promise<void>;
  deleteAssignment: (id: number) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [chores, setChores] = useState<Chore[]>([]);
  const [assignments, setAssignments] = useState<ChoreAssignment[]>([]);
  const [choresWithDetails, setChoresWithDetails] = useState<ChoreWithDetails[]>([]);
  const [usersWithChores, setUsersWithChores] = useState<UserWithChores[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refresh functions
  const refreshUsers = async (): Promise<void> => {
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      throw err;
    }
  };

  const refreshChores = async (): Promise<void> => {
    try {
      const data = await choreApi.getAll();
      setChores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chores');
      throw err;
    }
  };

  const refreshAssignments = async (): Promise<void> => {
    try {
      const data = await choreAssignmentApi.getAll();
      setAssignments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
      throw err;
    }
  };

  const refreshChoresWithDetails = async (): Promise<void> => {
    try {
      const data = await getChoresWithDetails();
      setChoresWithDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chores with details');
      throw err;
    }
  };

  const refreshUsersWithChores = async (): Promise<void> => {
    try {
      const data = await getUsersWithChores();
      setUsersWithChores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users with chores');
      throw err;
    }
  };

  const refreshAll = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        refreshUsers(),
        refreshChores(),
        refreshAssignments()
      ]);
      await Promise.all([
        refreshChoresWithDetails(),
        refreshUsersWithChores()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  // User operations
  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const newUser = await userApi.add(user);
      await refreshAll();
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add user');
      throw err;
    }
  };

  const updateUser = async (user: User) => {
    try {
      await userApi.update(user);
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await userApi.delete(id);
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      throw err;
    }
  };

  // Chore operations
  const addChore = async (chore: Omit<Chore, 'id'>) => {
    try {
      const newChore = await choreApi.add(chore);
      await refreshAll();
      return newChore;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add chore');
      throw err;
    }
  };

  const updateChore = async (chore: Chore) => {
    try {
      await choreApi.update(chore);
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update chore');
      throw err;
    }
  };

  const deleteChore = async (id: number) => {
    try {
      await choreApi.delete(id);
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete chore');
      throw err;
    }
  };

  // Assignment operations
  const addAssignment = async (assignment: Omit<ChoreAssignment, 'id'>) => {
    try {
      const newAssignment = await choreAssignmentApi.add(assignment);
      await refreshAll();
      return newAssignment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add assignment');
      throw err;
    }
  };

  const updateAssignment = async (assignment: ChoreAssignment) => {
    try {
      await choreAssignmentApi.update(assignment);
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update assignment');
      throw err;
    }
  };

  const deleteAssignment = async (id: number) => {
    try {
      await choreAssignmentApi.delete(id);
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete assignment');
      throw err;
    }
  };

  // Initial data load
  useEffect(() => {
    refreshAll();
  }, []);

  const value: ApiContextType = {
    // Data
    users,
    chores,
    assignments,
    choresWithDetails,
    usersWithChores,
    
    // Loading states
    loading,
    error,
    
    // Refresh functions
    refreshUsers,
    refreshChores,
    refreshAssignments,
    refreshAll,
    
    // User operations
    addUser,
    updateUser,
    deleteUser,
    
    // Chore operations
    addChore,
    updateChore,
    deleteChore,
    
    // Assignment operations
    addAssignment,
    updateAssignment,
    deleteAssignment,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}; 