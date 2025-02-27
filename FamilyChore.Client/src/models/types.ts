// Enums that match backend enumerations
export enum ChoreStatus {
  NotStarted = 1,
  InProgress = 2,
  Completed = 3
}

export enum Frequency {
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
  Quarterly = 4,
  Yearly = 5,
  OneOff = 6
}

export enum UserType {
  Parent = 1,
  Child = 2
}

// Interfaces that match backend models
export interface User {
  id: number;
  userName: string;
  userType: UserType;
}

export interface ChoreTask {
  id: number;
  choreId: number;
  taskName: string;
  taskDescription?: string;
}

export interface Chore {
  id: number;
  choreName: string;
  frequency: Frequency;
  tasks: ChoreTask[];
}

export interface ChoreAssignment {
  id: number;
  choreId: number;
  userId: number;
  assignmentDate?: string; // DateOnly in C# will be serialized as string
  choreStatus: ChoreStatus;
  consequence?: string;
  reward?: string;
}

// Extended interfaces for frontend use
export interface ChoreWithDetails extends Chore {
  assignedTo?: User;
  status?: ChoreStatus;
}

export interface UserWithChores extends User {
  assignedChores?: ChoreWithDetails[];
} 