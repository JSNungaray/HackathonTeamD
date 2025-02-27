using FamilyChore.Server.Services;
using FamilyChore.Server.Models;
using FamilyChore.Server.Data;
using FamilyChore.Server.Utilities;
using System.Runtime.CompilerServices;


namespace FamilyChore.Server.Manage
{
    public interface IManageUser
    {
        List<User> LoadUsers();
        User GetUserById(int id);
        User GetUserByName(string name);
        User AddUser(User newUser);
        void UpdateUser(User updatedUser);
        void DeleteUser(int id);
    }   

    public class ManageUser(JSONService jsonService, IUtilities utils) : IManageUser
    {
        private readonly JSONService _jsonService = jsonService;
        private readonly IUtilities _utils = utils;
        private readonly string filePath = "Data/User.json";

        public List<User> LoadUsers()
        {
            return _jsonService.LoadUsers();
        }
        public User GetUserById(int id)
        {
            return _jsonService.GetUserById(id);
        }
        public User GetUserByName(string name)
        {
            return _jsonService.GetUserByName(name);
        }
        public User AddUser(User newUser)
        {
            int id = _utils.MaxId<User>(filePath, 0);

            _jsonService.AddUser( new User
            {
                ID = id,
                UserName = newUser.UserName,
                UserType = newUser.UserType,
            });

            _jsonService.GetUserById(id);
            return newUser;
        }
        public void UpdateUser(User updatedUser)
        {
            _jsonService.UpdateUser(updatedUser);
        }
        public void DeleteUser(int id)
        {
            _jsonService.DeleteUser(id);
        }

    }
}
