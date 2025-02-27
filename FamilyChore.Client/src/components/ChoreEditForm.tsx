import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chore } from "@/components/Chore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "@/App"
import { fetchUsers } from "@/lib/utils"

interface ChoreEditFormProps {
  editedChore: Chore
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
  onChange: (updatedChore: Chore) => void
}

export function ChoreEditForm({ editedChore, onSubmit, onCancel, onChange }: ChoreEditFormProps) {
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    fetchUsers().then(u => setUserList(u));
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 rounded-lg" data-testid="chore-edit-form">
      <div className="space-y-2">
        <Label htmlFor="choreName">Name</Label>
        <Input
          id="choreName"
          value={editedChore.choreName}
          onChange={(e) => onChange({ ...editedChore, choreName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="userId">Assigned To</Label>
        <Select
          value={editedChore.ChoreAssignment?.userId.toString() || ''}
          onValueChange={(value) => onChange({
            ...editedChore,
            ChoreAssignment: {
              ...editedChore.ChoreAssignment,
              choreId: editedChore.id || 0,
              userId: parseInt(value),
              assignedDate: new Date().toISOString(),
              choreStatus: 0,
              consequence: '',
              reward: '',
              user: userList.find(u => u.id === value) || {
                id: '',
                userName: '',
                userType: ''
              }
            }
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a user..." />
          </SelectTrigger>
          <SelectContent>
            {userList.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.userName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save Changes</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
} 