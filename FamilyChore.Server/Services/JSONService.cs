using System.Text.Json;
using System.Collections.Generic;   
using FamilyChore.Server.Models;
using FamilyChore.Server.Data;
using FamilyChore.Server.Services;

namespace FamilyChore.Server.Services
{
    public class JSONService
    {


        public JSONService()
        { }


        private readonly string userPath = "Data/Users.json";    
        private readonly string chorePath = "Data/Chores.json";
        private readonly string choreStatusPath = "Data/ChoreStatus.json";
        private readonly string choreAssignmentPath = "Data/ChoreAssignment.json";


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


        // Chore CRUD operations
        public void SaveChores(List<Chore> chores)
        {
            var jsonString = JsonSerializer.Serialize(chores, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(chorePath, jsonString);
        }
     
        public List<Chore> LoadChores()
        {
            var jsonString = File.ReadAllText(chorePath);
            return JsonSerializer.Deserialize<List<Chore>>(jsonString) ?? new List<Chore>();
        }

        public void AddChore(Chore chore)
        {
            var chores = LoadChores();
            chores.Add(chore);
            SaveChores( chores);
        }

        public void UpdateChore(Chore updatedChore)
        {
            var chores = LoadChores();
            var chore = chores.ToList().Find(c => c.Id == updatedChore.Id);
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
                        choreTask.UserType = task.UserType;
                    }
                    else
                    {
                        chore.Tasks = chore.Tasks.Append(task).ToArray();
                    }
                    
                }
                ///TODO: Add a way to remove tasks that are not in the updated chore
                ///and verify tasks are updating correctly
                SaveChores(filePath, chores);
            }
        }

        public void DeleteChore(int choreId)
        {
            var chores = LoadChores();
            chores.RemoveAll(c => c.Id == choreId);
            SaveChores(chores);
        }
       

    }
}



