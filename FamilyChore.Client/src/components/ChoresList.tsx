import { ChoreCard } from "./ChoreCard"

interface FamilyMember {
  id: string
  name: string
  avatarUrl: string
}

interface Chore {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'completed'
  assignedTo?: FamilyMember
}

interface ChoresListProps {
  chores: Chore[]
}

export function ChoresList({ chores }: ChoresListProps) {
  return (
    <div className="container mx-auto p-4" data-testid="chores-list">
      <h2 className="text-2xl font-bold mb-6" data-testid="chores-heading">Chores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="chores-grid">
        {chores.map((chore) => (
          <ChoreCard
            key={chore.id}
            title={chore.title}
            description={chore.description}
            dueDate={chore.dueDate}
            status={chore.status}
            assignedTo={chore.assignedTo}
          />
        ))}
      </div>
    </div>
  )
} 