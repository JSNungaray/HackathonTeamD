import { useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Modal } from "@/components/ui/modal"
import ChoreComponent from "@/components/Chore"

interface ChoreProps {
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'completed'
  assignedTo?: {
    name: string
    avatarUrl?: string
  }
}

export function ChoreCard({ title, description, dueDate, status, assignedTo }: ChoreProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const titleSlug = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <>
      <Card className="w-full hover:bg-accent/5 transition-colors flex flex-col h-full" data-testid={`chore-card-${titleSlug}`}
        onClick={() => { setIsModalOpen(true) }}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-center items-center">
            <h3 className="font-semibold text-lg text-center" data-testid={`chore-title-${titleSlug}`}>{title}</h3>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4" data-testid={`chore-description-${titleSlug}`}>{description}</p>
          <p className="text-sm font-medium" data-testid={`chore-due-date-${titleSlug}`}>Due: {dueDate}</p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          {assignedTo ? (
            <div className="flex items-center gap-2" data-testid={`chore-assigned-to-${titleSlug}`}>
              <Avatar className="h-6 w-6">
                <AvatarImage src={assignedTo.avatarUrl} alt={assignedTo.name} />
                <AvatarFallback>{assignedTo.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{assignedTo.name}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground" data-testid={`chore-unassigned-${titleSlug}`}>Unassigned</span>
          )}
          <Badge
            variant={status === 'completed' ? 'success' : 'secondary'}
            data-testid={`chore-status-${titleSlug}`}
          >
            {status}
          </Badge>
        </CardFooter>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ChoreComponent chore={{ id: 0, name: title, description: description, dueDate: dueDate, status: status, assignedTo: assignedTo ? assignedTo.name : ''}}
          avatarUrl={assignedTo ? assignedTo.avatarUrl : ''}
        />
      </Modal>
    </>
  )
} 