using Microsoft.AspNetCore.Mvc;
using FamilyChore.Server.Manage;
using FamilyChore.Server.Models;


namespace FamilyChore.Server.Controllers
{
        [ApiController]
        [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IManageUser _manageUser;
        public UserController(IManageUser manageUser)
        {
            _manageUser = manageUser;
        }

        [HttpGet("GetUserById")]
        public IActionResult GetUserById(int id)
        {
            return new OkObjectResult(_manageUser.GetUserById(id));
        }

        [HttpGet("GetUserByName")]
        public IActionResult GetUserByName(string username)
        {
            return new OkObjectResult(_manageUser.GetUserByName(username));
        }

        [HttpGet("GetUserList")]
        public IActionResult GetUserList(int id)
        {
            return new OkObjectResult(_manageUser.LoadUsers());
        }


        [HttpPost("AddUser")]
        public IActionResult AddUser(User user)
        {
            return new OkObjectResult(_manageUser.AddUser(user));
        }

        [HttpPut("UpdateUser")]
        public IActionResult UpdateUser(User user)
        {
            _manageUser.UpdateUser(user);
            return new OkResult();
        }

        [HttpDelete("DeleteUser")]
        public IActionResult DeleteUser(int id)
        {
            _manageUser.DeleteUser(id);
            return new OkResult();
        }     



    }
}
