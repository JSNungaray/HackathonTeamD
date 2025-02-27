using FamilyChore.Server.Data;
using System.Linq.Expressions;

namespace FamilyChore.Server.Models
{
    public class ChoreAssignment
    {
        public int ID { get; set; }
        public int ChoreId {get; set; }
        public int UserId { get; set; }
        public DateOnly? AssignmentDate { get; set; }
        public Enumerators.ChoreStatus  ChoreStatus { get; set; }
        public string? Consequence { get; set; }
        public string? Reward { get; set; }
    }
}
