import { useState } from "react"
import { ChoreCard } from "./ChoreCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { Modal } from "@/components/ui/modal"
import { ChoreEditForm } from "@/components/ChoreEditForm"
import { Chore } from "@/components/Chore"

interface ChoresListProps {
  chores: Chore[]
}

export function ChoresList({ chores }: ChoresListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newChore, setNewChore] = useState<Chore>({
    id: 0,
    choreName: '',
    frequency: 0,
    ChoreAssignment: {
      choreId: 0,
      userId: 0,
      assignedDate: new Date().toISOString(),
      choreStatus: 0,
      consequence: '',
      reward: '',
      user: {
        id: '',
        userName: '',
        userType: ''
      }
    }
  })
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
              chore={chore}
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
          onSubmit={async (e) => { e.preventDefault(); }}
          onCancel={() => setIsModalOpen(false)}
          onChange={(editedChore) => setNewChore(editedChore)}
          data-testid="add-chore-form"
        />
      </Modal>
    </>
  )
} 