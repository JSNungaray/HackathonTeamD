import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { ChoreEditForm } from "@/components/ChoreEditForm"

export interface Chore {
  id?: number
  name: string
  description: string
  assignedTo: string
  dueDate: string
  status: string
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
      />
    )
  }

  return (
    <Card className="w-full dark:bg-gray-800 border-none dark:text-white" data-testid={`choredetails`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg" data-testid={`choredetails-name`}>{chore.name}</h3>
          <Badge
            variant={chore.status === 'completed' ? 'default' : 'secondary'}
            data-testid={`choredetails-status`}
          >
            {chore.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4" data-testid={`choredetails-description`}>{chore.description}</p>
        <p className="text-sm font-medium" data-testid={`choredetails-dueDate`}>Due: {chore.dueDate}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          {chore.assignedTo && (
            <Avatar className="h-6 w-6" data-testid={`choredetails-assignedTo-Avatar`}>
              <AvatarImage src={avatarUrl} alt={chore.assignedTo} />
              <AvatarFallback>{chore.assignedTo.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          <span className="text-sm text-muted-foreground" data-testid={`choredetails-assignedTo-name`}>{chore.assignedTo ?? 'Unassigned'}</span>
        </div>
      </CardFooter>
    </Card>
  )
} 