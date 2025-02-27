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
            var data = LoadData<T>(filePath);
            if (data == null || !data.Any())
            {
                return 0;
            }          

            var maxId = data.Max(item => (int)item.GetType().GetProperty("ID").GetValue(item));
            return maxId;
        }

        private List<T> LoadData<T>(string filePath) where T : class
        {
            var jsonData = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<T>>(jsonData);
        }
    }
}
