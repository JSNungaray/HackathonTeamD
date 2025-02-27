import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const titleSlug = title.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <Card className="w-full hover:bg-accent/5 transition-colors" data-testid={`chore-card-${titleSlug}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg" data-testid={`chore-title-${titleSlug}`}>{title}</h3>
          <Badge 
            variant={status === 'completed' ? 'default' : 'secondary'}
            data-testid={`chore-status-${titleSlug}`}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4" data-testid={`chore-description-${titleSlug}`}>{description}</p>
        <p className="text-sm font-medium" data-testid={`chore-due-date-${titleSlug}`}>Due: {dueDate}</p>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  )
} 