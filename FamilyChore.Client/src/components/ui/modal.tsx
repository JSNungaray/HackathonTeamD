import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  "data-testid"?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  "data-testid": dataTestId = "modal"
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-testid={`${dataTestId}-container`}>
      <DialogContent className="bg-card text-card-foreground" data-testid={`${dataTestId}-content`}>
        {(title || description) && (
          <DialogHeader data-testid={`${dataTestId}-header`}>
            {title && <DialogTitle data-testid={`${dataTestId}-title`}>{title}</DialogTitle>}
            {description && (
              <DialogDescription data-testid={`${dataTestId}-description`}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div data-testid={`${dataTestId}-body`}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
} 