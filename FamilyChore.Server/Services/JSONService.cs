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
        //public interface IJSONService
        //{
        //    List<User> LoadUsers();
        //    User GetUserById(int id);
        //    User GetUserByName(string username);
        //    void AddUser(User user);
        //    void UpdateUser(User updatedUser);
        //    void DeleteUser(int userId);
        //    List<Chore> LoadChores();
        //    Chore GetChoreById(int id);
        //    Chore GetChoreByName(string choreName);
        //    void SaveUsers(List<User> users);
        //    void SaveChores(List<Chore> chores);
        //    Chore AddChore(Chore chore);
        //    void UpdateChore(Chore updatedChore);
        //    void DeleteChore(int choreId);
        //}


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

        /// <summary>
        /// TODO: Verify Tasks are handled correctly
        /// </summary>
        /// <param name="chore"></param>
        public Chore AddChore(Chore chore)
        {
            var chores = LoadChores();
            
            chores.Add(chore);
            SaveChores( chores);
            Chore newChore = chores.Last();  //VALIDATE THIS
            return newChore;

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
       

    }
}



