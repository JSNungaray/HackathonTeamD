using Microsoft.AspNetCore.Mvc;

namespace FamilyChore.Server.Controllers
{
    public class Administrative : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
