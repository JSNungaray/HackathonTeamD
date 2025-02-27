import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface FamilyMemberProps {
  name: string
  role: string
  avatarUrl?: string
  isSelected?: boolean
  onClick?: () => void
}

export function FamilyMemberCard({ name, role, avatarUrl, isSelected, onClick }: FamilyMemberProps) {
  return (
    <Card 
      className={cn(
        "w-full transition-colors cursor-pointer",
        isSelected ? "bg-accent" : "hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardHeader>
    </Card>
  )
} 