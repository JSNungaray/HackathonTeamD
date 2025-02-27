import { useState } from 'react'
import { FamilyMembersList } from './components/FamilyMembersList'
import { ChoresList } from './components/ChoresList'

// Mock data - would typically come from an API
const mockFamilyMembers = [
  { id: "1", name: "John Doe", role: "Dad", avatarUrl: "" },
  { id: "2", name: "Jane Doe", role: "Mom", avatarUrl: "" },
  { id: "3", name: "Jimmy Doe", role: "Son", avatarUrl: "" },
  { id: "4", name: "Jenny Doe", role: "Daughter", avatarUrl: "" },
]

const mockChores = [
  {
    id: "1",
    title: "Clean Kitchen",
    description: "Wipe counters, clean dishes, sweep floor",
    dueDate: "2024-02-28",
    status: "pending" as const,
    assignedTo: mockFamilyMembers[0],
  },
  {
    id: "2",
    title: "Vacuum Living Room",
    description: "Vacuum carpet and under furniture",
    dueDate: "2024-02-27",
    status: "completed" as const,
    assignedTo: mockFamilyMembers[1],
  },
  {
    id: "3",
    title: "Take Out Trash",
    description: "Empty all trash bins and replace bags",
    dueDate: "2024-02-28",
    status: "pending" as const,
    assignedTo: mockFamilyMembers[2],
  },
  {
    id: "4",
    title: "Do Laundry",
    description: "Wash, dry, and fold clothes",
    dueDate: "2024-02-29",
    status: "not started" as const,
  },
]

export interface User {
  id: string
  userName: string
  userType: string
}

function App() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("all")

  const filteredChores = selectedMemberId === "all"
    ? mockChores
    : mockChores.filter(chore => 
        chore.assignedTo?.id === selectedMemberId || 
        (!chore.assignedTo && selectedMemberId === "unassigned")
      )

  return (
    <div className="min-h-screen" data-testid="app">
      <header className="border-b md:border-b" data-testid="app-header">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold" data-testid="app-title">Family Chores</h1>
        </div>
      </header>
      <div className="flex flex-col md:flex-row" data-testid="app-content">
        <aside className="w-full md:w-[320px] md:border-r" data-testid="app-sidebar">
          <FamilyMembersList
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
          />
        </aside>
        <main className="flex-1" data-testid="app-main">
          <ChoresList chores={filteredChores} />
        </main>
      </div>
    </div>
  )
}

export default App
