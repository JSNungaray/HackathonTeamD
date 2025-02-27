using FamilyChore.Server.Manage;
using FamilyChore.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FamilyChore.Server.Controllers
{

    [ApiController]
    [Route("[controller]/")]
    public class AdminController : Controller
    {
        private readonly IManageAdmin _manageAdmin;

        [HttpPut("UpdateAssignment")]
        public IActionResult UpdateAssignment(ChoreAssignment assignment)
        {
            _manageAdmin.UpdateAssignment(assignment);
            return new OkResult();
        }

        [HttpDelete("DeleteAssignment")]
        public IActionResult DeleteChoreAssignment(int id)
        {
            _manageAdmin.DeleteAssignment(id);
            return new OkResult();
        }

        [HttpPost("AddAssignment")]
        public IActionResult AddAssignment(ChoreAssignment assignment)
        {
            _manageAdmin.AddAssignment(assignment);
            return new OkResult();
        }

        [HttpGet("GetAssignmentsByUserId")]
        public IActionResult GetAssignmentsByUserId(int id)
        {
            var assignment = _manageAdmin.GetAssignmentsByUserId(id);
            return new OkObjectResult(assignment);
        }

        [HttpGet("GetAssignmentById")]
        public IActionResult GetAssignmentById(int id)
        {
            var assignment = _manageAdmin.GetAssignmentById(id);
            return new OkObjectResult(assignment);
        }
        [HttpGet("LoadAssignmentList")]
        public IActionResult LoadAssignmentList()
        {
            var assignmentList = _manageAdmin.LoadAssignments();
            return new OkObjectResult(assignmentList);
        }


    }
}
