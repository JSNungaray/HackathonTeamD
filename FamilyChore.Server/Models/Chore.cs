using FamilyChore.Server.Data;

namespace FamilyChore.Server.Models
{
    public class Chore
    {
        public int Id { get; set; }
        public string ChoreName { get; set; }
        public Enumerators.Frequency Frequency { get; set; }
        public ChoreTasks[] Tasks { get; set; }

    }

    public class ChoreTasks { 
        public int ID { get; set; }
        public int ChoreId { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public Enumerators.UserTypes UserType { get; set; }
    }

}
