using Microsoft.AspNetCore.Mvc;

namespace FamilyChore.Server.Controllers
{
    public class ChoresController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
