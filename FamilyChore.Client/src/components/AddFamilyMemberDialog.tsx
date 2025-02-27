import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "@radix-ui/react-icons"

interface AddFamilyMemberDialogProps {
  trigger?: React.ReactNode
}

export function AddFamilyMemberDialog({ trigger }: AddFamilyMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Form submission will be handled by another developer
    setOpen(false)
    setName("")
    setRole("")
  }

  const defaultTrigger = (
    <Button variant="ghost" size="icon" data-testid="add-family-member-button">
      <PlusIcon className="h-5 w-5" data-testid="add-family-member-icon" />
      <span className="sr-only" data-testid="add-family-member-sr-text">Add Family Member</span>
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen} data-testid="add-family-member-dialog-container">
      <DialogTrigger asChild data-testid="add-family-member-trigger">
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent data-testid="add-family-member-dialog">
        <DialogHeader data-testid="add-family-member-header">
          <DialogTitle data-testid="add-family-member-title">Add Family Member</DialogTitle>
          <DialogDescription data-testid="add-family-member-description">
            Add a new member to your family group.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="add-family-member-form">
          <div className="space-y-2" data-testid="family-member-name-container">
            <Label htmlFor="name" data-testid="family-member-name-label">Name</Label>
            <Input
              id="name"
              data-testid="family-member-name-input"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="space-y-2" data-testid="family-member-role-container">
            <Label htmlFor="role" data-testid="family-member-role-label">Role</Label>
            <Input
              id="role"
              data-testid="family-member-role-input"
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
              placeholder="Enter role (e.g., Dad, Mom, Son)"
              required
            />
          </div>
          <DialogFooter data-testid="add-family-member-footer">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="cancel-add-family-member"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="submit-add-family-member"
            >
              Add Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 