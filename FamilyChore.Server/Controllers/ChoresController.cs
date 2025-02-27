using Microsoft.AspNetCore.Mvc;
using FamilyChore.Server.Manage;
using FamilyChore.Server.Models;


namespace FamilyChore.Server.Controllers
{
    [ApiController]
    [Route("[controller]/")]

    public class ChoresController : Controller
    {


        private readonly IManageChores _manageChore;
        public ChoresController(IManageChores manageChore)
        {
            _manageChore = manageChore;
        }

        [HttpGet("GetChoreList")]
        public IActionResult GetChoreList(int id)
        {
            return new OkObjectResult(_manageChore.LoadChores());
        }

        [HttpGet("GetChoreById")]
        public IActionResult GetChoreById(int id)
        {
            return new OkObjectResult(_manageChore.GetChoreById(id));
        }

        [HttpGet("GetChoreByName")]
        public IActionResult GetChoreByName(string choreName)
        {
            return new OkObjectResult(_manageChore.GetChoreByName(choreName));
        }

        [HttpPost("AddChore")]
        public IActionResult AddChore(Chore chore)
        {
            return new OkObjectResult(_manageChore.AddChore(chore));
        }


        [HttpDelete("DeleteChore")]
        public IActionResult DeleteChoreById(int id)
        {
            _manageChore.DeleteChoreById(id);
            return new OkResult();
        }


        [HttpPut("UpdateChore")]
        public IActionResult UpdateChore(Chore chore)
        {
            _manageChore.UpdateChore(chore);
            return new OkResult();
        }

    }
}
