using Microsoft.AspNetCore.Mvc;
using FamilyChore.Server.Manage;
using FamilyChore.Server.Models;


namespace FamilyChore.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ChoresController : Controller
    {

      
        private readonly ManageChores   _manageChore;
        public ChoresController(ManageChores manageChore)
        {
            _manageChore = manageChore;
        }

        [HttpGet(Name = "GetChoreList")]
        public IActionResult GetChoreList(int id)
        {
            return new OkObjectResult(_manageChore.LoadChores());
        }

        [HttpGet(Name = "GetChoreById")]
        public IActionResult GetUserById(int id)
        {
            return new OkObjectResult(_manageChore.GetChoreById(id));
        }

        [HttpGet(Name = "GetChoreByName")]
        public IActionResult GetUserByName(string choreName)
        {
            return new OkObjectResult(_manageChore.GetChoreByName(choreName));
        }

        [HttpPost(Name = "AddChore")]
        public IActionResult AddChore(Chore chore)
        {
            return new OkObjectResult(_manageChore.AddChore(chore));
        }


        [HttpPut(Name = "DeleteChore")]
        public IActionResult DeleteChoreById(int id)
        {
            return new OkObjectResult(_manageChore.DeleteChoreById(id));
        }


    }
}
