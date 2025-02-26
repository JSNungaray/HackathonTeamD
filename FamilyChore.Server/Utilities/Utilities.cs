using System.Text.Json;
using FamilyChore.Server.Services;

namespace FamilyChore.Server.Utilities
{
    public interface IUtilities
    {
        int MaxId<T>(string filePath) where T : class;
    }
    public class Utilities : IUtilities
    {
        private readonly JSONService _jsonService;

        public Utilities(JSONService jsonService)
        {
            _jsonService = jsonService;
        }

        public int MaxId<T>(string filePath) where T : class
        {
            var data = _jsonService.LoadData<T>(filePath);
            if (data == null || !data.Any())
            {
                return 0;
            }

            var maxId = data.Max(item => (int)item.GetType().GetProperty("Id").GetValue(item));
            return maxId;
        }
    }
}
