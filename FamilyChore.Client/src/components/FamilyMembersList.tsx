import { FamilyMemberCard } from "./FamilyMemberCard"
import { Button } from "@/components/ui/button"
import { AddFamilyMemberDialog } from "./AddFamilyMemberDialog"

// Temporary mock data - this would typically come from an API
const mockFamilyMembers = [
  { id: "1", name: "John Doe", role: "Dad", avatarUrl: "" },
  { id: "2", name: "Jane Doe", role: "Mom", avatarUrl: "" },
  { id: "3", name: "Jimmy Doe", role: "Son", avatarUrl: "" },
  { id: "4", name: "Jenny Doe", role: "Daughter", avatarUrl: "" },
]

interface FamilyMembersListProps {
  selectedMemberId: string
  onSelectMember: (memberId: string) => void
}

export function FamilyMembersList({ selectedMemberId, onSelectMember }: FamilyMembersListProps) {
  const handleDelete = (memberId: string) => {
    // Delete functionality will be handled by another developer
    console.log('Delete member:', memberId)
  }

  return (
    <div className="p-4" data-testid="family-members-list">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold" data-testid="family-members-heading">Family Members</h2>
        <AddFamilyMemberDialog />
      </div>
      <div className="flex gap-2 mb-4" data-testid="family-members-filters">
        <Button
          data-testid="filter-all"
          variant={selectedMemberId === "all" ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => onSelectMember("all")}
        >
          All
        </Button>
        <Button
          data-testid="filter-unassigned"
          variant={selectedMemberId === "unassigned" ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => onSelectMember("unassigned")}
        >
          Unassigned
        </Button>
      </div>
      <div className="space-y-2" data-testid="family-members-grid">
        {mockFamilyMembers.map((member) => (
          <FamilyMemberCard
            key={member.id}
            name={member.name}
            role={member.role}
            avatarUrl={member.avatarUrl}
            isSelected={selectedMemberId === member.id}
            onClick={() => onSelectMember(member.id)}
            onDelete={() => handleDelete(member.id)}
          />
        ))}
      </div>
    </div>
  )
} 