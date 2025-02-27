import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export interface Chore {
  id: number
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