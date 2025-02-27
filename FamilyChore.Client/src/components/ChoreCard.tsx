import { useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Modal } from "@/components/ui/modal"
import ChoreComponent from "@/components/Chore"
import { Chore } from "@/components/Chore"

interface ChoreProps {
  chore: Chore
}

export function ChoreCard({ chore }: ChoreProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const titleSlug = chore.choreName.toLowerCase().replace(/\s+/g, '-')

  return (
    <>
      <Card className="w-full hover:bg-accent/5 transition-colors flex flex-col h-full" data-testid={`chore-card-${titleSlug}`}
        onClick={() => { setIsModalOpen(true) }}
      >
        <CardHeader className="pb-2" data-testid={`chore-header-${titleSlug}`}>
          <div className="flex justify-center items-center" data-testid={`chore-title-container-${titleSlug}`}>
            <h3 className="font-semibold text-lg text-center" data-testid={`chore-title-${titleSlug}`}>{chore.choreName}</h3>
          </div>
        </CardHeader>
        <CardContent className="flex-grow" data-testid={`chore-content-${titleSlug}`}>
          <p className="text-sm font-medium" data-testid={`chore-due-date-${titleSlug}`}>
            <span data-testid={`chore-due-date-label-${titleSlug}`}>Due: </span>
            <span data-testid={`chore-due-date-value-${titleSlug}`}>{chore.ChoreAssignment?.assignedDate}</span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto" data-testid={`chore-footer-${titleSlug}`}>
          {chore.ChoreAssignment?.user ? (
            <div className="flex items-center gap-2" data-testid={`chore-assigned-to-${titleSlug}`}>
              <Avatar className="h-6 w-6" data-testid={`chore-avatar-${titleSlug}`}>
                <AvatarFallback data-testid={`chore-avatar-fallback-${titleSlug}`}>{chore.ChoreAssignment.user.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground" data-testid={`chore-assigned-name-${titleSlug}`}>{chore.ChoreAssignment.user.userName}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground" data-testid={`chore-unassigned-${titleSlug}`}>Unassigned</span>
          )}
          {chore.ChoreAssignment?.choreStatus !== 1 && (
            <Badge
              variant={chore.ChoreAssignment?.choreStatus === 3 ? 'success' : 'secondary'}
              data-testid={`chore-status-${titleSlug}`}
            >
              {chore.ChoreAssignment?.choreStatus == 1 ? 'not started' : chore.ChoreAssignment?.choreStatus == 2 ? 'pending' : 'completed'}
            </Badge>
          )}
        </CardFooter>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data-testid={`chore-modal-${titleSlug}`}
      >
        <ChoreComponent chore={chore} />
      </Modal>
    </>
  )
} 