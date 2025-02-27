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
import { useApi } from "@/services/ApiContext"
import { UserType } from "@/models/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddFamilyMemberDialogProps {
  trigger?: React.ReactNode
}

export function AddFamilyMemberDialog({ trigger }: AddFamilyMemberDialogProps) {
  const { addUser } = useApi();
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [userType, setUserType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!name || !userType) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addUser({
        userName: name,
        userType: userType === "parent" ? UserType.Parent : UserType.Child
      });
      
      // Reset form and close dialog on success
      setOpen(false)
      setName("")
      setUserType("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add family member");
    } finally {
      setIsSubmitting(false);
    }
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
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm" data-testid="add-family-member-error">
            {error}
          </div>
        )}
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
            <Label htmlFor="userType" data-testid="family-member-role-label">Role</Label>
            <Select 
              value={userType} 
              onValueChange={setUserType}
              data-testid="family-member-role-select"
            >
              <SelectTrigger id="userType" data-testid="family-member-role-trigger">
                <SelectValue placeholder="Select role" data-testid="family-member-role-value" />
              </SelectTrigger>
              <SelectContent data-testid="family-member-role-content">
                <SelectItem value="parent" data-testid="family-member-role-parent">Parent</SelectItem>
                <SelectItem value="child" data-testid="family-member-role-child">Child</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter data-testid="add-family-member-footer">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="cancel-add-family-member"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="submit-add-family-member"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 