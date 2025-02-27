import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface Chore {
  id: number
  name: string
  description: string
  assignedTo: string
  dueDate: string
  isComplete: boolean
}

interface ChoreProps {
  chore: Chore
  onUpdate?: (updatedChore: Chore) => void
}

export default function ChoreComponent({ chore, onUpdate }: ChoreProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedChore, setEditedChore] = useState(chore)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/api/chores/${chore.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedChore),
      })

      if (!response.ok) throw new Error('Failed to update chore')
      
      onUpdate?.(editedChore)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating chore:', error)
    }
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={editedChore.name}
            onChange={(e) => setEditedChore({ ...editedChore, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={editedChore.description}
            onChange={(e) => setEditedChore({ ...editedChore, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            value={editedChore.assignedTo}
            onChange={(e) => setEditedChore({ ...editedChore, assignedTo: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={editedChore.dueDate.split('T')[0]}
            onChange={(e) => setEditedChore({ ...editedChore, dueDate: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Save Changes</Button>
          <Button 
            type="button" 
            variant="outline"
            className="dark:text-black"
            onClick={() => {
              setEditedChore(chore)
              setIsEditing(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="font-bold text-lg">{chore.name}</h3>
      <p className="text-gray-600">{chore.description}</p>
      <p>Assigned to: {chore.assignedTo}</p>
      <p>Due: {new Date(chore.dueDate).toLocaleDateString()}</p>
      <p>Status: {chore.isComplete ? 'Completed' : 'Pending'}</p>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
    </div>
  )
} 