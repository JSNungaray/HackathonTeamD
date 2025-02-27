using FamilyChore.Server.Models;
using FamilyChore.Server.Services;
using FamilyChore.Server.Utilities;

namespace FamilyChore.Server.Manage
{
    public interface IManageAdmin
    {
        List<ChoreAssignment> LoadAssignments();
        ChoreAssignment GetAssignmentById(int id);
        List<ChoreAssignment> GetAssignmentsByUserId(int id);
        void DeleteAssignment(int id);
     ChoreAssignment AddAssignment(ChoreAssignment newAssignment);
        void UpdateAssignment(ChoreAssignment updatedAssignment);
        // ChoreAssignment SaveAssignment(ChoreAssignment choreAssignment);
        //ChoreAssignment AddAssignment(ChoreAssignment newAssignment);
    }
    public class ManageAdmin :IManageAdmin
    {
        private readonly JSONService _jsonService;
        private readonly string filePath = "Data/ChoreAssignment.json";
        private readonly IUtilities _utils;

        public ManageAdmin( IUtilities utils) {
            _utils = utils;
        }

        #region Assignment CRUD Operations
        public List<ChoreAssignment> LoadAssignments() { 
        return _jsonService.LoadAssignments();
        }
        public ChoreAssignment GetAssignmentById(int id) {
        return _jsonService.GetAssignmentById(id);
        }
        public List<ChoreAssignment> GetAssignmentsByUserId(int id) {
            return _jsonService.GetAssignmentsByUserId(id);
        }
        public void DeleteAssignment(int id) { 
         _jsonService.DeleteAssignment(id);
        }
        public ChoreAssignment AddAssignment(ChoreAssignment newAssignment) {
            return _jsonService.AddChoreAssignment(newAssignment);
        }
        public void UpdateAssignment(ChoreAssignment updatedAssignment) {
             _jsonService.UpdateAssignment(updatedAssignment);
        }
         

      

        #endregion

    }
}
