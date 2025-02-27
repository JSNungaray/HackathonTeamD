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
  const nameSlug = memberName.toLowerCase().replace(/\s+/g, '-');
  
  const defaultTrigger = (
    <Button 
      variant="ghost" 
      size="icon"
      className="h-8 w-8 text-muted-foreground hover:text-destructive"
      data-testid={`delete-family-member-button-${nameSlug}`}
    >
      <TrashIcon className="h-4 w-4" data-testid={`delete-family-member-icon-${nameSlug}`} />
      <span className="sr-only" data-testid={`delete-family-member-sr-text-${nameSlug}`}>Delete {memberName}</span>
    </Button>
  )

  return (
    <AlertDialog data-testid={`delete-family-member-alert-dialog-${nameSlug}`}>
      <AlertDialogTrigger asChild data-testid={`delete-family-member-trigger-${nameSlug}`}>
        {trigger || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent data-testid={`delete-family-member-dialog-${nameSlug}`}>
        <AlertDialogHeader data-testid={`delete-family-member-header-${nameSlug}`}>
          <AlertDialogTitle data-testid={`delete-family-member-title-${nameSlug}`}>Delete Family Member</AlertDialogTitle>
          <AlertDialogDescription data-testid={`delete-family-member-description-${nameSlug}`}>
            Are you sure you want to remove {memberName} from your family group? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter data-testid={`delete-family-member-footer-${nameSlug}`}>
          <AlertDialogCancel data-testid={`cancel-delete-family-member-${nameSlug}`}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive hover:bg-destructive/90"
            data-testid={`confirm-delete-family-member-${nameSlug}`}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 