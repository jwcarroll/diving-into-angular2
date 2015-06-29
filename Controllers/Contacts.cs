using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using DivingIntoAngular.Models;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DivingIntoAngular.Controllers
{
    [Route("api/[controller]")]
    public class Contacts : Controller
    {
        // GET: api/contacts
        [HttpGet]
        public async Task<IEnumerable<Contact>> Get()
        {
            using(var context = new ContactListContext()){
                return await context.Contacts.ToListAsync();
            }
        }
    }
}
