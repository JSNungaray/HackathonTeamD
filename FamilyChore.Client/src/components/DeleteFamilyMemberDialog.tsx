import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"

interface DeleteFamilyMemberDialogProps {
  memberName: string
  trigger?: React.ReactNode
  onDelete: () => void
}

export function DeleteFamilyMemberDialog({ 
  memberName, 
  trigger,
  onDelete 
}: DeleteFamilyMemberDialogProps) {
  const defaultTrigger = (
    <Button 
      variant="ghost" 
      size="icon"
      className="h-8 w-8 text-muted-foreground hover:text-destructive"
      data-testid={`delete-family-member-button-${memberName.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <TrashIcon className="h-4 w-4" />
      <span className="sr-only">Delete {memberName}</span>
    </Button>
  )

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent data-testid={`delete-family-member-dialog-${memberName.toLowerCase().replace(/\s+/g, '-')}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Family Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove {memberName} from your family group? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="cancel-delete-family-member">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive hover:bg-destructive/90"
            data-testid={`confirm-delete-family-member-${memberName.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 