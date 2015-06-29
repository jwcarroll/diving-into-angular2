using Microsoft.AspNet.Mvc;

namespace DivingIntoAngular.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
