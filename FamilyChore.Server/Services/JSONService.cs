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
        {
        }
        public void SaveUsers(string filePath, List<User> users)
        {
            var jsonString = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(filePath, jsonString);
        }
        public List<User> LoadUsers(string filePath)
        {
            var jsonString = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<User>>(jsonString);
        }

        public void AddUser(string filePath, User user)
        {
            var users = LoadUsers(filePath);
            users.Add(user);
            SaveUsers(filePath, users);
        }

        public void UpdateUser(string filePath, User updatedUser)
        {
            var users = LoadUsers(filePath);
            var user = users.Find(u => u.ID == updatedUser.ID);
            if (user != null)
            {
                user.UserName = updatedUser.UserName;
                user.UserType = updatedUser.UserType;
                SaveUsers(filePath, users);
            }
        }

        public void DeleteUser(string filePath, int userId)
        {
            var users = LoadUsers(filePath);
            users.RemoveAll(u => u.ID == userId);
            SaveUsers(filePath, users);
        }

        // Chore CRUD operations
        public void SaveChores(string filePath, List<Chore> chores)
        {
            var jsonString = JsonSerializer.Serialize(chores, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(filePath, jsonString);
        }

        public List<Chore> LoadChores(string filePath)
        {
            var jsonString = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<Chore>>(jsonString);
        }

        public void AddChore(string filePath, Chore chore)
        {
            var chores = LoadChores(filePath);
            chores.Add(chore);
            SaveChores(filePath, chores);
        }

        public void UpdateChore(string filePath, Chore updatedChore)
        {
            var chores = LoadChores(filePath);
            var chore = chores.Find(c => c.Id == updatedChore.Id);
            if (chore != null)
            {
                chore.Name = updatedChore.Name;
                chore.Status = updatedChore.Status;
                chore.Frequency = updatedChore.Frequency;
                SaveChores(filePath, chores);
            }
        }

        public void DeleteChore(string filePath, int choreId)
        {
            var chores = LoadChores(filePath);
            chores.RemoveAll(c => c.Id == choreId);
            SaveChores(filePath, chores);
        }
    }
}


/*
 // User operations
var users = jsonService.LoadUsers("Data/User.json");
jsonService.AddUser("Data/User.json", new User { ID = 3, UserName = "New User", UserType = Enumerators.UserTypes.Child });
jsonService.UpdateUser("Data/User.json", new User { ID = 3, UserName = "Updated User", UserType = Enumerators.UserTypes.Parent });
jsonService.DeleteUser("Data/User.json", 3);
 */