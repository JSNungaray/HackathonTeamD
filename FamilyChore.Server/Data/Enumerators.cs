using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace FamilyChore.Server.Data
{
    public class Enumerators
    {
        public Enumerators()
        {
        }
        public enum ChoreStatus
        {
            NotStarted,
            InProgress,
            Completed
        }
        public enum Frequency
        {
            Daily = 1,
            Weekly,
            Monthly,
            Quarterly,
            Yearly,
            OneOff
        }
        public enum UserTypes
        {
            Parent,
            Child
        }

    }
}
