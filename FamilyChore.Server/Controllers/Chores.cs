using Microsoft.AspNetCore.Mvc;

namespace FamilyChore.Server.Controllers
{
    public class Chores : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
