using Microsoft.AspNetCore.Mvc;
using FamilyChore.Server.Manage;
using FamilyChore.Server.Models;


namespace FamilyChore.Server.Controllers
{
        [ApiController]
        [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ManageUser _manageUser;
        public UserController(ManageUser manageUser)
        {
            _manageUser = manageUser;
        }

        [HttpGet(Name = "GetUserById")]
        public IActionResult GetUserById(int id)
        {
            return new OkObjectResult(_manageUser.GetUserById(id));
        }

        [HttpGet(Name = "GetUserByName")]
        public IActionResult GetUserByName(string username)
        {
            return new OkObjectResult(_manageUser.GetUserByName(username));
        }

        [HttpGet(Name = "GetUserList")]
        public IActionResult GetUserList(int id)
        {
            return new OkObjectResult(_manageUser.LoadUsers());
        }


        [HttpPost(Name = "AddUser")]
        public IActionResult AddUser(User user)
        {
            return new OkObjectResult(_manageUser.AddUser(user));
        }

        [HttpGet(Name = "UpdateUser")]
        public IActionResult UpdateUser(User user)
        {
            _manageUser.UpdateUser(user);
            return new OkResult();
        }

        [HttpGet(Name = "DeleteUser")]
        public IActionResult DeleteUser(int id)
        {
            _manageUser.DeleteUser(id);
            return new OkResult();
        }     



    }
}
