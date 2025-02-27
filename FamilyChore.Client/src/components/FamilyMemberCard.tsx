import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { DeleteFamilyMemberDialog } from "./DeleteFamilyMemberDialog"
import { Badge } from "@/components/ui/badge"

interface FamilyMemberProps {
  name: string
  role: string
  avatarUrl?: string
  isSelected?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export function FamilyMemberCard({ 
  name, 
  role, 
  avatarUrl, 
  isSelected, 
  onClick,
  onDelete 
}: FamilyMemberProps) {
  const nameSlug = name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Card 
      data-testid={`family-member-card-${nameSlug}`}
      className={cn(
        "w-full transition-colors cursor-pointer group relative touch-pan-y",
        isSelected ? "bg-accent" : "hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center space-y-0 py-3" data-testid={`family-member-header-${nameSlug}`}>
        <Avatar className="h-10 w-10 mr-3" data-testid={`family-member-avatar-${nameSlug}`}>
          <AvatarImage src={avatarUrl} alt={name} data-testid={`family-member-avatar-image-${nameSlug}`} />
          <AvatarFallback data-testid={`family-member-avatar-fallback-${nameSlug}`}>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0" data-testid={`family-member-info-${nameSlug}`}>
          <h3 className="font-semibold text-base truncate" data-testid={`family-member-name-${nameSlug}`}>
            {name}
          </h3>
          <p className="text-sm text-muted-foreground" data-testid={`family-member-role-${nameSlug}`}>
            {role}
          </p>
        </div>
        {onDelete && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity md:block hidden ml-2" data-testid={`family-member-delete-container-${nameSlug}`}>
            <DeleteFamilyMemberDialog
              memberName={name}
              onDelete={onDelete}
              data-testid={`family-member-delete-dialog-${nameSlug}`}
            />
          </div>
        )}
      </CardHeader>
      {/* Mobile swipe indicator */}
      {onDelete && (
        <div className="absolute inset-y-0 right-0 w-1 bg-destructive/10 md:hidden" data-testid={`family-member-swipe-indicator-${nameSlug}`} />
      )}
    </Card>
  )
} 