import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chore } from "@/components/Chore"

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
    let hasErrors = false
    
    ;(['name', 'description', 'dueDate'] as const).forEach(field => {
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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex justify-between">
          <span>Name</span>
          {touched.name && errors.name && (
            <span className="text-sm text-destructive">{errors.name}</span>
          )}
        </Label>
        <Input
          id="name"
          value={editedChore.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="flex justify-between">
          <span>Description</span>
          {touched.description && errors.description && (
            <span className="text-sm text-destructive">{errors.description}</span>
          )}
        </Label>
        <Input
          id="description"
          value={editedChore.description}
          onChange={(e) => handleChange('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          className={errors.description ? 'border-destructive' : ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Input
          id="assignedTo"
          value={editedChore.assignedTo}
          onChange={(e) => handleChange('assignedTo', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate" className="flex justify-between">
          <span>Due Date</span>
          {touched.dueDate && errors.dueDate && (
            <span className="text-sm text-destructive">{errors.dueDate}</span>
          )}
        </Label>
        <Input
          id="dueDate"
          type="date"
          value={editedChore.dueDate.split('T')[0]}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          onBlur={() => handleBlur('dueDate')}
          className={errors.dueDate ? 'border-destructive' : ''}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save Changes</Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 