import { Card, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { DeleteFamilyMemberDialog } from "./DeleteFamilyMemberDialog"
import { Badge } from "@/components/ui/badge"
import { useSwipeable } from "react-swipeable"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"

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
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Reset swipe when component unmounts or when isDeleting changes
  useEffect(() => {
    return () => setSwipeOffset(0);
  }, [isDeleting]);

  const swipeHandlers = useSwipeable({
    onSwiping: (event) => {
      if (onDelete && event.dir === "Left") {
        // Limit the maximum swipe distance
        const maxSwipe = -80;
        const newOffset = Math.max(event.deltaX, maxSwipe);
        setSwipeOffset(newOffset);
      }
    },
    onSwiped: (event) => {
      if (onDelete && event.dir === "Left") {
        // If swiped more than 40% of the delete button width, show delete button
        if (swipeOffset <= -40) {
          setSwipeOffset(-80); // Fully reveal delete button
        } else {
          setSwipeOffset(0); // Reset to original position
        }
      } else {
        setSwipeOffset(0);
      }
    },
    trackMouse: false,
    trackTouch: true,
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger onClick if we're not in the middle of a swipe
    if (swipeOffset === 0 && onClick) {
      onClick();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsDeleting(true);
  };

  return (
    <div className="relative overflow-hidden rounded-md" {...swipeHandlers}>
      <Card 
        data-testid={`family-member-card-${nameSlug}`}
        className={cn(
          "w-full transition-colors cursor-pointer group relative touch-pan-y",
          isSelected ? "bg-accent" : "hover:bg-accent/50"
        )}
        onClick={handleCardClick}
        ref={cardRef}
        style={{ 
          transform: `translateX(${swipeOffset}px)`,
          transition: 'transform 0.2s ease-out'
        }}
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
      </Card>
      
      {/* Delete button that appears when swiped */}
      {onDelete && (
        <div 
          className="absolute inset-y-0 right-0 flex items-center justify-center bg-destructive text-destructive-foreground"
          style={{ 
            width: '80px',
            transform: swipeOffset < 0 ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.2s ease-out'
          }}
          onClick={handleDeleteClick}
          data-testid={`family-member-swipe-delete-${nameSlug}`}
        >
          <DeleteFamilyMemberDialog
            memberName={name}
            onDelete={() => {
              if (onDelete) {
                onDelete();
                setSwipeOffset(0);
                setIsDeleting(false);
              }
            }}
            trigger={
              <div className="flex flex-col items-center justify-center h-full w-full">
                <TrashIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Delete</span>
              </div>
            }
          />
        </div>
      )}
      
      {/* Mobile swipe indicator */}
      {onDelete && swipeOffset === 0 && (
        <div 
          className="absolute inset-y-0 right-0 w-1 bg-destructive/10 md:hidden" 
          data-testid={`family-member-swipe-indicator-${nameSlug}`} 
        />
      )}
    </div>
  )
} 