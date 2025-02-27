import { useState, useMemo } from 'react'
import { FamilyMembersList } from './components/FamilyMembersList'
import { ChoresList } from './components/ChoresList'
import { ApiProvider } from './services/ApiContext'
import { useApi } from './services/ApiContext'
import { mapToFrontendChores } from './services/adapters'
import { Chore } from './models/types'

// Remove the local User interface since we now have it in models/types.ts
// export interface User {
//   id: string
//   userName: string
//   userType: string
// }

// Wrap the main app content with the API provider
function AppContent() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("all")
  const { choresWithDetails, loading, error, refreshAll } = useApi();

  // Convert backend models to frontend models
  const frontendChores = useMemo(() => 
    mapToFrontendChores(choresWithDetails), 
    [choresWithDetails]
  );

  // Filter chores based on selected member
  const filteredChores = useMemo(() => {
    if (selectedMemberId === "all") {
      return frontendChores;
    }
    
    return frontendChores.filter(chore => 
      chore.assignedTo?.id === selectedMemberId || 
      (!chore.assignedTo && selectedMemberId === "unassigned")
    );
  }, [frontendChores, selectedMemberId]);

  const addChoreToList = async (chore: Chore) => {
    try {
      await refreshAll();
    } catch (error) {
      console.error('Failed to add chore:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-destructive">
          <p className="text-lg mb-2">Error loading data</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" data-testid="app">
      <header className="border-b md:border-b" data-testid="app-header">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold" data-testid="app-title">Chores Mediator</h1>
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
          <ChoresList chores={filteredChores} onChoreAdded={addChoreToList} />
        </main>
      </div>
    </div>
  )
}

// Main App component that provides the API context
function App() {
  return (
    <ApiProvider>
      <AppContent />
    </ApiProvider>
  )
}

export default App
