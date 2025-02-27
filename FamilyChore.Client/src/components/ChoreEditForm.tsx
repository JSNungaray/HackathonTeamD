import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChoreWithDetails, User, ChoreTask } from "@/models/types"
import { fetchUsers } from "@/lib/utils"

interface ChoreEditFormProps {
  editedChore: ChoreWithDetails
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
  onChange: (updatedChore: ChoreWithDetails) => void
}

type ExtendedChoreFields = keyof ChoreWithDetails | 'taskDescription'

export function ChoreEditForm({ editedChore, onSubmit, onCancel, onChange }: ChoreEditFormProps) {
  const [users, setUsers] = useState<User[]>([])

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers()
      setUsers(fetchedUsers)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // Set today's date as default if no date is provided
  useEffect(() => {
    if (!editedChore.dueDate) {
      const today = new Date().toISOString().split('T')[0]
      handleChange('dueDate', today)
    }
  }, [])

  // Initialize with a default task if none exists
  useEffect(() => {
    if (!editedChore.tasks || editedChore.tasks.length === 0) {
      const defaultTask: ChoreTask = {
        id: 0,
        choreId: editedChore.id || 0,
        taskName: editedChore.choreName || 'Default Task',
        taskDescription: ''
      }
      handleChange('tasks', [defaultTask])
    }
  }, [])

  const handleChange = async (field: ExtendedChoreFields, value: any) => {
    if (field === 'assignedTo') {
      if (users.length === 0) {
        console.log('no users');
        await loadUsers()
      }
      console.log('assignedTo', value)
      const selectedUser = users.find(user => user.id.toString() == value.toString())
      console.log('user', selectedUser)
      const updatedChore = { ...editedChore, assignedTo: selectedUser }
      onChange(updatedChore)
    } else if (field === 'taskDescription') {
      // Update the first task's description
      const updatedTasks = editedChore.tasks.length > 0
        ? [
            { 
              ...editedChore.tasks[0], 
              taskDescription: value,
              taskName: editedChore.choreName // Keep task name in sync with chore name
            },
            ...editedChore.tasks.slice(1)
          ]
        : [{
            id: 0,
            choreId: editedChore.id || 0,
            taskName: editedChore.choreName,
            taskDescription: value
          }]
      const updatedChore = { ...editedChore, tasks: updatedTasks }
      onChange(updatedChore)
    } else if (field === 'choreName') {
      // When choreName changes, update both the name and the first task's name
      const updatedTasks = editedChore.tasks.length > 0
        ? [
            { ...editedChore.tasks[0], taskName: value },
            ...editedChore.tasks.slice(1)
          ]
        : [{
            id: 0,
            choreId: editedChore.id || 0,
            taskName: value,
            taskDescription: ''
          }]
      const updatedChore = { ...editedChore, [field]: value, tasks: updatedTasks }
      onChange(updatedChore)
    } else {
      const updatedChore = { ...editedChore, [field]: value }
      onChange(updatedChore)
    }
  }

  const getMinDate = () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday.toISOString().split('T')[0]
  }

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 rounded-lg" data-testid="chore-edit-form">
      <div className="space-y-2" data-testid="chore-edit-name-container">
        <Label htmlFor="choreName" data-testid="chore-edit-name-label">
          <span data-testid="chore-edit-name-label-text">Name</span>
        </Label>
        <Input
          id="choreName"
          value={editedChore.choreName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('choreName', e.target.value)}
          data-testid="chore-edit-name-input"
        />
      </div>

      <div className="space-y-2" data-testid="chore-edit-details-container">
        <Label htmlFor="taskDescription" data-testid="chore-edit-details-label">
          <span data-testid="chore-edit-details-label-text">Details</span>
        </Label>
        <Textarea
          id="taskDescription"
          value={editedChore.tasks?.[0]?.taskDescription || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('taskDescription', e.target.value)}
          placeholder="Enter chore details..."
          className="min-h-[100px]"
          data-testid="chore-edit-details-input"
        />
      </div>

      <div className="space-y-2" data-testid="chore-edit-assignedto-container">
        <Label htmlFor="assignedTo" data-testid="chore-edit-assignedto-label">
          <span data-testid="chore-edit-assignedto-label-text">Assigned To</span>
        </Label>
        <Select 
          value={editedChore.assignedTo?.id || ''} 
          onValueChange={(value) => handleChange('assignedTo', value)}
          data-testid="chore-edit-assignedto-select"
        >
          <SelectTrigger id="assignedTo" data-testid="chore-edit-assignedto-trigger">
            <SelectValue placeholder="Select user" data-testid="chore-edit-assignedto-value" />
          </SelectTrigger>
          <SelectContent data-testid="chore-edit-assignedto-content">
            {users.map(user => (
              <SelectItem 
                key={user.id} 
                value={user.id} 
                data-testid={`chore-edit-assignedto-option-${user.id}`}
              >
                {user.userName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
{/* 
      <div className="space-y-2" data-testid="chore-edit-date-container">
        <Label htmlFor="dueDate" data-testid="chore-edit-date-label">
          <span data-testid="chore-edit-date-label-text">Due Date</span>
        </Label>
        <Input
          type="date"
          id="dueDate"
          value={editedChore.dueDate?.split('T')[0] || getTodayDate()}
          min={getMinDate()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('dueDate', e.target.value)}
          data-testid="chore-edit-date-input"
        />
      </div> */}

      <div className="flex gap-2" data-testid="chore-edit-buttons-container">
        <Button type="submit" data-testid="chore-edit-save-button">Save Changes</Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-testid="chore-edit-cancel-button"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 