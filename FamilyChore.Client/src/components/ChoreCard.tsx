import { useState } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Modal } from "@/components/ui/modal"
import ChoreComponent, { Chore } from "@/components/Chore"

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
        <CardHeader className="pb-2">
          <div className="flex justify-center items-center">
            <h3 className="font-semibold text-lg text-center">{chore.choreName}</h3>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4">{chore.ChoreAssignment?.consequence || ''}</p>
          <p className="text-sm font-medium">
            <span>Due: </span>
            <span>{chore.ChoreAssignment?.assignedDate || ''}</span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          <div className="flex items-center gap-2">
            {chore.ChoreAssignment?.user.userName && (
              <Avatar className="h-6 w-6">
                <AvatarFallback>{chore.ChoreAssignment?.user.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
            <span className="text-sm text-muted-foreground">{chore.ChoreAssignment?.user.userName || 'Unassigned'}</span>
          </div>
          {chore.ChoreAssignment?.choreStatus !== 0 && (
            <Badge variant={chore.ChoreAssignment?.choreStatus === 2 ? 'success' : 'secondary'}>
              {chore.ChoreAssignment?.choreStatus === 2 ? 'completed' : 'pending'}
            </Badge>
          )}
        </CardFooter>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ChoreComponent chore={chore} />
      </Modal>
    </>
  )
} 