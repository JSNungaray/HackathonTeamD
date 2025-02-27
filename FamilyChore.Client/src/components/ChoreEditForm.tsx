import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chore } from "@/components/Chore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "@/App"

interface ChoreEditFormProps {
  editedChore: Chore
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
  onChange: (updatedChore: Chore) => void
}

interface ValidationErrors {
  name?: string
  description?: string
  dueDate?: string
}

export function ChoreEditForm({ editedChore, onSubmit, onCancel, onChange }: ChoreEditFormProps) {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/User/GetUserList`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Debug log

        if (!Array.isArray(data)) {
          console.error('Expected array of users, received:', typeof data);
          return;
        }

        setUserList(data.map((user: User) => ({
          id: user.id,
          userName: user.userName,
          userType: user.userType
        })));
      } catch (error) {
        console.error('Error fetching users:', error);
        console.log('Response details:', {
          url: `${import.meta.env.VITE_API_URL}/User/GetUserList`,
          error
        });
      }
    };

    fetchUsers();
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' :
          value.length < 3 ? 'Name must be at least 3 characters' :
            undefined
      case 'description':
        return !value.trim() ? 'Description is required' : undefined
      case 'dueDate':
        return !value ? 'Due date is required' :
          new Date(value) < new Date(new Date().toDateString()) ? 'Due date cannot be in the past' :
            undefined
      default:
        return undefined
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, editedChore[field as keyof Chore] as string)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleChange = (field: keyof Chore, value: string) => {
    const updatedChore = { ...editedChore, [field]: value }
    onChange(updatedChore)

    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: ValidationErrors = {}
    let hasErrors = false;

    (['name', 'description', 'dueDate'] as const).forEach(field => {
      const error = validateField(field, editedChore[field] as string)
      if (error) {
        newErrors[field] = error
        hasErrors = true
      }
    })

    setErrors(newErrors)
    setTouched({ name: true, description: true, dueDate: true })

    if (!hasErrors) {
      await onSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg" data-testid="chore-edit-form">
      <div className="space-y-2" data-testid="chore-edit-name-container">
        <Label htmlFor="name" className="flex justify-between" data-testid="chore-edit-name-label">
          <span data-testid="chore-edit-name-label-text">Name</span>
          {touched.name && errors.name && (
            <span className="text-sm text-destructive" data-testid="chore-edit-name-error">{errors.name}</span>
          )}
        </Label>
        <Input
          id="name"
          value={editedChore.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={errors.name ? 'border-destructive' : ''}
          data-testid="chore-edit-name-input"
        />
      </div>

      <div className="space-y-2" data-testid="chore-edit-description-container">
        <Label htmlFor="description" className="flex justify-between" data-testid="chore-edit-description-label">
          <span data-testid="chore-edit-description-label-text">Description</span>
          {touched.description && errors.description && (
            <span className="text-sm text-destructive" data-testid="chore-edit-description-error">{errors.description}</span>
          )}
        </Label>
        <Input
          id="description"
          value={editedChore.description}
          onChange={(e) => handleChange('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          className={errors.description ? 'border-destructive' : ''}
          data-testid="chore-edit-description-input"
        />
      </div>

      <div className="space-y-2" data-testid="chore-edit-assignedTo-container">
        <Label htmlFor="assignedTo" data-testid="chore-edit-assignedTo-label">
          <span data-testid="chore-edit-assignedTo-label-text">Assigned To</span>
        </Label>

        <Select
          data-testid={`chore-edit-choreAssignedTo`}
          value={editedChore.assignedTo.toString()}
          onValueChange={(value) => handleChange('assignedTo', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a user..." />
          </SelectTrigger>
          <SelectContent>
            {userList.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()} data-testid={`chore-edit-choreAssignedTo-${user.id}`}>
                {user.userName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2" data-testid="chore-edit-dueDate-container">
        <Label htmlFor="dueDate" className="flex justify-between" data-testid="chore-edit-dueDate-label">
          <span data-testid="chore-edit-dueDate-label-text">Due Date</span>
          {touched.dueDate && errors.dueDate && (
            <span className="text-sm text-destructive" data-testid="chore-edit-dueDate-error">{errors.dueDate}</span>
          )}
        </Label>
        <Input
          id="dueDate"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={editedChore.dueDate.split('T')[0]}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          onBlur={() => handleBlur('dueDate')}
          className={errors.dueDate ? 'border-destructive' : ''}
          data-testid="chore-edit-dueDate-input"
        />
      </div>

      <div className="space-y-2" data-testid="chore-edit-status-container">
        <Label htmlFor="status" data-testid="chore-edit-status-label">
          <span data-testid="chore-edit-status-label-text">Status</span>
        </Label>
        <Select 
          value={editedChore.status} 
          onValueChange={(value) => handleChange('status', value)}
          data-testid="chore-edit-status-select"
        >
          <SelectTrigger id="status" data-testid="chore-edit-status-trigger">
            <SelectValue placeholder="Select status" data-testid="chore-edit-status-value" />
          </SelectTrigger>
          <SelectContent data-testid="chore-edit-status-content">
            <SelectItem value="not started" data-testid="chore-edit-status-option-not-started">Not Started</SelectItem>
            <SelectItem value="pending" data-testid="chore-edit-status-option-pending">Pending</SelectItem>
            <SelectItem value="completed" data-testid="chore-edit-status-option-completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

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