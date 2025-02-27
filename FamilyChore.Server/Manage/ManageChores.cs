using FamilyChore.Server.Services;
using FamilyChore.Server.Models;
using FamilyChore.Server.Data;
using FamilyChore.Server.Utilities;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;



namespace FamilyChore.Server.Manage
{
    public interface IManageChores
    {
        List<Chore> LoadChores();
        Chore GetChoreById(int id);
        Chore GetChoreByName(string choreName);
        void DeleteChoreById(int id);
        Chore AddChore(Chore newChore);
        void UpdateChore(Chore updatedChore);
    }

    public class ManageChores :IManageChores
    {
        private readonly JSONService _jsonService;
        private readonly IUtilities _utils;
        private readonly string filePath = "Data/Chores.json";

        public ManageChores(JSONService jsonService, IUtilities utils)
        {
            _jsonService = jsonService;
            _utils = utils;
        }

        public List<Chore> LoadChores()
        {
            return _jsonService.LoadChores();
        }

        public Chore GetChoreById(int id)
        {
            return _jsonService.GetChoreById(id);
        }

        public Chore GetChoreByName(string choreName)
        {
            return _jsonService.GetChoreByName(choreName);
        }

        public void DeleteChoreById(int id)
        {
            _jsonService.DeleteChore(id);
        }

        public Chore AddChore(Chore newChore)
        {
            int id = _utils.MaxId<Chore>(filePath);
            id = id + 1;

            if (newChore.Tasks != null && newChore.Tasks.Length > 0)
            {             

                for (int i = 0; i < newChore.Tasks.Length; i++)
                {
                    newChore.Tasks[i].ID = i+1;
                    newChore.Tasks[i].ChoreId = id;
                    newChore.Tasks[i].TaskName = newChore.Tasks[i].TaskName;
                    newChore.Tasks[i].TaskDescription = newChore.Tasks[i].TaskDescription;                   
                }
            }

            _jsonService.AddChore(new Chore
            {
                ID = id,
                ChoreName = newChore.ChoreName,
                Frequency = newChore.Frequency,
                Tasks = newChore.Tasks
            });

            return newChore;
        }

        public void UpdateChore(Chore updatedChore)
        {
            _jsonService.UpdateChore(updatedChore);
        }
    }
}
