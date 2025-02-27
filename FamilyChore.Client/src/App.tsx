import { useState } from 'react'
import { FamilyMembersList } from './components/FamilyMembersList'
import { ChoresList } from './components/ChoresList'

export interface User {
  id: string
  userName: string
  userType: string
}

function App() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("all")
  const [chores, setChores] = useState<Chore[]>([]);

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
