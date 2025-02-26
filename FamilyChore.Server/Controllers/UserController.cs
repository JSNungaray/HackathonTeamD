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

        [HttpPost(Name = "AddUser")]
        public IActionResult AddUser(User user)
        {
            return new OkObjectResult(_manageUser.AddUser(user));
        }

        [HttpGet(Name = "GetUserById")]
        public IActionResult GetUserById(int id)
        {
            return new OkObjectResult(_manageUser.GetUserById(id));
        }
        [HttpGet(Name = "GetUserList")]
        public IActionResult GetUserList(int id)
        {
            return new OkObjectResult(_manageUser.LoadUsers());
        }

    }
}
