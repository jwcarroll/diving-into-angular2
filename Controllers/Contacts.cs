using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DivingIntoAngular.Controllers
{
    [Route("api/[controller]")]
    public class Contacts : Controller
    {
        // GET: api/contacts
        [HttpGet]
        public IEnumerable<Object> Get()
        {
            return new []{
                new{ name = "Josh", twitter = "jwcarroll" },
	            new{ name = "Jeremy", twitter = "jeremylikness" },
            };
        }
    }
}
