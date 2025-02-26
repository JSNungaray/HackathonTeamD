using FamilyChore.Server.Data;

namespace FamilyChore.Server.Models
{
    public class User
    {
        public int ID { get; set; }
        public required string UserName { get; set; }
        public Enumerators.UserTypes UserType { get; set; }

    }
}
