import { ChoreWithDetails, ChoreStatus, User, UserType } from '../models/types';

// These interfaces must exactly match what's expected in ChoresList.tsx
export interface FamilyMember {
  id: string;
  name: string;
  avatarUrl: string; // Not optional to match ChoresList expectation
}

export interface FrontendChore {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'not started' | 'pending' | 'completed';
  assignedTo?: FamilyMember;
}

// Interface for FamilyMembersList component
export interface FrontendFamilyMember {
  id: string;
  userName: string;
  userType: string;
}

// Convert backend ChoreStatus to frontend status string
export const mapChoreStatus = (status?: ChoreStatus): 'not started' | 'pending' | 'completed' => {
  if (!status) return 'not started';
  
  switch (status) {
    case ChoreStatus.NotStarted:
      return 'not started';
    case ChoreStatus.InProgress:
      return 'pending';
    case ChoreStatus.Completed:
      return 'completed';
    default:
      return 'not started';
  }
};

// Convert backend User to frontend FamilyMember for ChoresList
export const mapUserToFamilyMember = (user?: User): FamilyMember | undefined => {
  if (!user) return undefined;
  
  return {
    id: user.id.toString(),
    name: user.userName,
    // Provide a default avatar URL to satisfy the non-optional type
    avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.userName)}&background=random`
  };
};

// Convert backend User to FrontendFamilyMember for FamilyMembersList
export const mapUserToFrontendFamilyMember = (user: User): FrontendFamilyMember => {
  return {
    id: user.id.toString(),
    userName: user.userName,
    userType: user.userType === UserType.Parent ? '1' : '2'
  };
};

// Convert an array of backend Users to FrontendFamilyMembers
export const mapToFrontendFamilyMembers = (users: User[]): FrontendFamilyMember[] => {
  return users.map(mapUserToFrontendFamilyMember);
};

// Convert backend ChoreWithDetails to frontend Chore
export const mapToFrontendChore = (chore: ChoreWithDetails): FrontendChore => {
  return {
    id: chore.id.toString(),
    title: chore.choreName,
    // Use the first task description as the chore description, or a default message
    description: chore.tasks && chore.tasks.length > 0 
      ? (chore.tasks[0].taskDescription || chore.tasks[0].taskName) 
      : 'No description available',
    // You might need to format the date based on your backend data
    dueDate: 'Due soon', // Replace with actual date when available
    status: mapChoreStatus(chore.status),
    assignedTo: mapUserToFamilyMember(chore.assignedTo)
  };
};

// Convert an array of backend ChoreWithDetails to frontend Chores
export const mapToFrontendChores = (chores: ChoreWithDetails[]): FrontendChore[] => {
  return chores.map(mapToFrontendChore);
}; 