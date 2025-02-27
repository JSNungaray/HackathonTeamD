import { useMemo } from "react"
import { FamilyMemberCard } from "./FamilyMemberCard"
import { Button } from "@/components/ui/button"
import { AddFamilyMemberDialog } from "./AddFamilyMemberDialog"
import { useApi } from "@/services/ApiContext"
import { mapToFrontendFamilyMembers } from "@/services/adapters"

interface FamilyMembersListProps {
  selectedMemberId: string
  onSelectMember: (memberId: string) => void
}

export function FamilyMembersList({ selectedMemberId, onSelectMember }: FamilyMembersListProps) {
  const { users, deleteUser } = useApi();
  
  // Convert backend users to frontend format
  const familyMembers = useMemo(() => 
    mapToFrontendFamilyMembers(users), 
    [users]
  );

  const handleDelete = async (memberId: string) => {
    try {
      await deleteUser(parseInt(memberId, 10));
    } catch (error) {
      console.error('Error deleting family member:', error);
    }
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
        {familyMembers.map((member) => (
          <FamilyMemberCard
            key={member.id}
            name={member.userName}
            role={member.userType === '1' ? 'Parent' : 'Child'}
            isSelected={selectedMemberId === member.id}
            onClick={() => onSelectMember(member.id)}
            onDelete={() => handleDelete(member.id)}
          />
        ))}
      </div>
    </div>
  )
} 