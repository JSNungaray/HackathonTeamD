using System.Text.Json;
using System.Collections.Generic;   
using FamilyChore.Server.Models;
using FamilyChore.Server.Data;
using FamilyChore.Server.Services;
using System.Text.Json.Serialization;

namespace FamilyChore.Server.Services
{
    public class JSONService
    {
        private readonly string userPath = "Data/Users.json";
        private readonly string chorePath = "Data/Chores.json";
        private readonly string choreStatusPath = "Data/ChoreStatus.json";
        private readonly string choreAssignmentPath = "Data/ChoreAssignment.json";
        private readonly JsonSerializerOptions _jsonOptions;


        public JSONService()
        {
            _jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                Converters = { new JsonStringEnumConverter() }
            };
        }

        #region User CRUD Operations
        public void SaveUsers( List<User> users)
        {
            var jsonString = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(userPath, jsonString);
        }
        public List<User> LoadUsers()
        {
            var jsonString = File.ReadAllText(userPath);
            return JsonSerializer.Deserialize<List<User>>(jsonString) ?? new List<User>();
        }

        public User GetUserById(int id)
        {
            var users = LoadUsers();
            return users.FirstOrDefault(u => u.ID == id);
        }
        public User GetUserByName(string username )
        {
            var users = LoadUsers();
            return users.FirstOrDefault(u => u.UserName == username);
        }

        public void AddUser(User user)
        {
            var users = LoadUsers();
            users.Add(user);
            SaveUsers(users);
        }

        public void UpdateUser(User updatedUser)
        {
            var users = LoadUsers();
            var user = users.Find(u => u.ID == updatedUser.ID);
            if (user != null)
            {
                user.UserName = updatedUser.UserName;
                user.UserType = updatedUser.UserType;
                SaveUsers( users);
            }
        }

        public void DeleteUser(int userId)
        {
            var users = LoadUsers();
            users.RemoveAll(u => u.ID == userId);
            SaveUsers(users);
        }
        #endregion

        #region Chore object CRUD Operations
        // Chore CRUD operations
        public List<Chore> LoadChores()
        {
            var jsonString = File.ReadAllText(chorePath);
            return JsonSerializer.Deserialize<List<Chore>>(jsonString) ?? new List<Chore>();
        }

        public Chore GetChoreById(int id)
        {
            var chores = LoadChores();
            return chores.FirstOrDefault(c => c.ID == id);
        }

        public Chore GetChoreByName(string choreName)
        {
            var chores = LoadChores();
            return chores.FirstOrDefault(c => c.ChoreName == choreName);
        }


        public void SaveChores(List<Chore> chores)
        {
            var jsonString = JsonSerializer.Serialize(chores);
            File.WriteAllText(chorePath, jsonString);
        }

        public Chore AddChore(Chore chore)
        {
            var chores = LoadChores();
            
            chores.Add(chore);
            SaveChores(chores);
            return GetChoreByName(chore.ChoreName);

        }

        public void UpdateChore(Chore updatedChore)
        {
            var chores = LoadChores();
            var chore = chores.ToList().Find(c => c.ID == updatedChore.ID);
            if (chore != null)
            {
                chore.ChoreName = updatedChore.ChoreName;
                chore.Frequency = updatedChore.Frequency;
               
                foreach (var task in updatedChore.Tasks)
                {
                    var choreTask = chore.Tasks.ToList().Find(t => t.ID == task.ID);
                    if (choreTask != null)
                    {
                        choreTask.TaskName = task.TaskName;
                        choreTask.TaskDescription = task.TaskDescription;
                       
                    }
                    else
                    {
                        chore.Tasks = chore.Tasks.Append(task).ToArray();
                    }
                    
                }
                ///TODO: Add a way to remove tasks that are not in the updated chore
                ///and verify tasks are updating correctly
                SaveChores(chores);
            }
        }

        public void DeleteChore(int choreId)
        {
            var chores = LoadChores();
            chores.RemoveAll(c => c.ID == choreId);            
            SaveChores(chores);
        }

        #endregion

        #region ChoreAssignment CRUD Operations
        public List<ChoreAssignment> LoadAssignments()
        {
            var jsonString = File.ReadAllText(choreAssignmentPath);
            return JsonSerializer.Deserialize<List<ChoreAssignment>>(jsonString, _jsonOptions) ?? new List<ChoreAssignment>();
        }

        public ChoreAssignment GetAssignmentById(int id)
        {
            var assignments = LoadAssignments();
            return assignments.FirstOrDefault(a => a.ID == id);
        }
        public List<ChoreAssignment> GetAssignmentsByUserId(int userId)
        {
            var assignments = LoadAssignments();
            return assignments.Where(a => a.UserId == userId).ToList();
        }

        public void SaveAssignment(ChoreAssignment choreAssignments)
        {
            var jsonString = JsonSerializer.Serialize(choreAssignments, _jsonOptions);
            File.WriteAllText(choreAssignmentPath, jsonString);
        }


        public ChoreAssignment AddChoreAssignment(ChoreAssignment newAssignment)
        {
            var assignments = LoadAssignments();
            newAssignment.ID = assignments.Any() ? assignments.Max(a => a.ID) + 1 : 1; // Generate a new ID
            assignments.Add(newAssignment);
            SaveChoreAssignments(assignments);
            return newAssignment;
        }


        public void UpdateAssignment(ChoreAssignment updatedAssignment)
        {
            var assignments = LoadAssignments();
            var assignment = assignments.FirstOrDefault(a => a.ID == updatedAssignment.ID);
            if (assignment != null)
            {
                assignment.ChoreId = updatedAssignment.ChoreId;
                assignment.UserId = updatedAssignment.UserId;
                assignment.AssignmentDate = updatedAssignment.AssignmentDate;
                assignment.ChoreStatus = updatedAssignment.ChoreStatus;
                assignment.Consequence = updatedAssignment.Consequence;
                assignment.Reward = updatedAssignment.Reward;
                SaveChoreAssignments(assignments);
            }
        }

        public void DeleteAssignment(int assignmentId)
        {
            var assignments = LoadAssignments();
            assignments.RemoveAll(a => a.ID == assignmentId);
            SaveChoreAssignments(assignments);
        }

        public void SaveChoreAssignments(List<ChoreAssignment> choreAssignments)
        {
            var jsonString = JsonSerializer.Serialize(choreAssignments, _jsonOptions);
            File.WriteAllText(choreAssignmentPath, jsonString);
        }

        #endregion

        public string GenerateChoreAssignmentReport()
        {
            var assignments = LoadAssignments();
            var chores = LoadChores();
            var users = LoadUsers();

            var report = assignments.Select(a => new
            {
                UserName = users.FirstOrDefault(u => u.ID == a.UserId)?.UserName,
                ChoreName = chores.FirstOrDefault(c => c.ID == a.ChoreId)?.ChoreName,               
                AssignmentDate = a.AssignmentDate?.ToString("yyyy-MM-dd"),
                a.ChoreStatus,
                a.Consequence,
                a.Reward
            }).ToList();

            return JsonSerializer.Serialize(report, _jsonOptions);
        }

    }
}



