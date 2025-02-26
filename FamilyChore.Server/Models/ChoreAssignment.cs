using FamilyChore.Server.Data;
using System.Linq.Expressions;

namespace FamilyChore.Server.Models
{
    public class ChoreAssignment
    {
        public int ID { get; set; }
        public int ChoreId {get; set; }
        public int UserId { get; set; }
        public Enumerators.ChoreStatus  ChoreStatus { get; set; }
         
    }
}
