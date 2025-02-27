import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { ChoreEditForm } from "@/components/ChoreEditForm"
import { User } from "@/App"

export interface Chore {
  id?: number
  choreName: string
  frequency?: number,
  ChoreAssignment: ChoreAssignment
}

export interface ChoreAssignment {
  id?: number
  choreId: number
  userId: number
  assignedDate: string
  choreStatus: number,
  consequence: string,
  reward: string,
  user: User
}

interface ChoreProps {
  chore: Chore,
  avatarUrl?: string,
  onUpdate?: (updatedChore: Chore) => void
}

export default function ChoreComponent({ chore, avatarUrl, onUpdate }: ChoreProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedChore, setEditedChore] = useState(chore)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chores/${chore.id}`, {
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
      <ChoreEditForm
        editedChore={editedChore}
        onSubmit={handleSubmit}
        onChange={setEditedChore}
        onCancel={() => {
          setEditedChore(chore)
          setIsEditing(false)
        }}
        data-testid="choredetails-edit-form"
      />
    )
  }

  return (
    <Card className="w-full border-none flex flex-col h-full" data-testid="choredetails">
      <CardHeader className="pb-2" data-testid="choredetails-header">
        <div className="flex justify-center items-center" data-testid="choredetails-title-container">
          <h3 className="font-semibold text-lg text-center" data-testid="choredetails-name">{chore.choreName}</h3>
        </div>
      </CardHeader>
      <CardContent className="flex-grow" data-testid="choredetails-content">
        <p className="text-sm text-muted-foreground mb-4" data-testid="choredetails-description">{chore.ChoreAssignment.consequence}</p>
        <p className="text-sm font-medium" data-testid="choredetails-dueDate">
          <span data-testid="choredetails-dueDate-label">Due: </span>
          <span data-testid="choredetails-dueDate-value">{chore.ChoreAssignment.assignedDate}</span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto" data-testid="choredetails-footer">
        <div className="flex items-center gap-2" data-testid="choredetails-assignedTo-container">
          {chore.ChoreAssignment.user && (
            <Avatar className="h-6 w-6" data-testid="choredetails-assignedTo-Avatar">
              <AvatarImage src={avatarUrl} alt={chore.ChoreAssignment.user.userName} data-testid="choredetails-assignedTo-AvatarImage" />
              <AvatarFallback data-testid="choredetails-assignedTo-AvatarFallback">{chore.ChoreAssignment.user.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          <span className="text-sm text-muted-foreground" data-testid="choredetails-assignedTo-name">{chore.ChoreAssignment.user.userName ?? 'Unassigned'}</span>
        </div>
        {chore.ChoreAssignment.choreStatus !== 0 && (
          <Badge
            variant={chore.ChoreAssignment.choreStatus === 2 ? 'success' : 'secondary'}
            data-testid="choredetails-status"
          >
            {chore.ChoreAssignment.choreStatus === 2 ? 'completed' : 'pending'}
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
} 