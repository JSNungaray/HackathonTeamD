import { useState } from "react"
import { ChoreCard } from "./ChoreCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { Modal } from "@/components/ui/modal"
import { ChoreEditForm } from "@/components/ChoreEditForm"
import { Chore, ChoreStatus, Frequency, ChoreAssignment } from "@/models/types"
import { choreApi, choreAssignmentApi } from "@/services/api"

interface FamilyMember {
  name: string
  avatarUrl?: string
}

interface ChoreWithUI {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'not started' | 'pending' | 'completed'
  assignedTo?: FamilyMember
}

interface ChoresListProps {
  chores: ChoreWithUI[]
  onChoreAdded?: (chore: Chore) => void
}

export function ChoresList({ chores, onChoreAdded }: ChoresListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newChore, setNewChore] = useState<Chore>({
    id: 0,
    choreName: '',
    frequency: Frequency.OneOff,
    tasks: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('newChore', newChore)
      // Create a new chore without the id field
      const choreToCreate: Omit<Chore, 'id'> = {
        choreName: newChore.choreName,
        frequency: newChore.frequency,
        tasks: newChore.tasks
      }

      const createdChore = await choreApi.add(choreToCreate)

      const newChoreList = await await choreApi.getAll()
      const newestChore = newChoreList[newChoreList.length - 1];

      console.log('createdChore', createdChore)
      const assignment: ChoreAssignment = {
        id: 0,
        choreId: Number(newestChore.id),
        userId: Number(newChore.assignedTo?.id ?? 0),
        choreStatus: ChoreStatus.NotStarted
      };

      await choreAssignmentApi.add(assignment)

      console.log('createdChore', createdChore)

      // Close modal and reset form
      setIsModalOpen(false)
      setNewChore({
        id: 0,
        choreName: '',
        frequency: Frequency.OneOff,
        tasks: []
      })

      // Notify parent component
      onChoreAdded?.(createdChore)
    } catch (error) {
      console.error('Failed to create chore:', error)
      // TODO: Add error handling UI
    }
  }

  return (
    <>
      <div className="container mx-auto p-4" data-testid="chores-list">
        <div className="flex justify-between items-center mb-6" data-testid="chores-list-header">
          <h2 className="text-2xl font-bold" data-testid="chores-heading">Chores</h2>
          <Button
            variant="default"
            data-testid="add-chore-button"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="h-5 w-5 mr-2" data-testid="add-chore-icon" />
            <span data-testid="add-chore-text">Add Chore</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr" data-testid="chores-grid">
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data-testid="add-chore-modal"
      >
        <ChoreEditForm 
          editedChore={newChore}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          onChange={(editedChore) => setNewChore(editedChore)}
          data-testid="add-chore-form"
        />
      </Modal>
    </>
  )
} 