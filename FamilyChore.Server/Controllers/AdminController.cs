using Microsoft.AspNetCore.Mvc;

namespace FamilyChore.Server.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
