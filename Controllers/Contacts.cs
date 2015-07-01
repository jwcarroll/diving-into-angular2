using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using DivingIntoAngular.Models;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Logging;
using AutoMapper;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DivingIntoAngular.Controllers
{
    [Route("api/[controller]")]
    public class Contacts : Controller
    {
        private ContactListContext _contactList;
        private ILogger<Contacts> _logger;

        public Contacts(ContactListContext context, ILogger<Contacts> logger)
        {
            _contactList = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Contact>> Get()
        {
            return await _contactList.Contacts.ToListAsync();
        }

        [HttpGet("{contactId:int}")]
        public async Task<IActionResult> GetContact(Int32 contactId)
        {
            Contact existingContact = null;

            existingContact = await _contactList.Contacts
               .SingleOrDefaultAsync(c => c.Id == contactId);

            if (existingContact == null)
            {
                return HttpNotFound();
            }

            return new ObjectResult(existingContact);
        }

        [HttpPost()]
        public async Task<IActionResult> AddContact(Contact contact)
        {
            _logger.LogInformation(JsonConvert.SerializeObject(contact));
            
            _contactList.Contacts.Add(contact);
            await _contactList.SaveChangesAsync();

            return Created(
                Url.Action(nameof(GetContact), new { contactId = contact.Id }),
                contact
            );
        }

        [HttpPut("{contactId:int}")]
        public async Task<IActionResult> UpdateContact(Int32 contactId, [FromBody] Contact contact)
        {
            Contact existingContact = null;

            existingContact = await _contactList.Contacts
               .SingleOrDefaultAsync(c => c.Id == contactId);

            if (existingContact == null)
            {
                return HttpNotFound();
            }
            
            Mapper.Map(contact, existingContact);
            
            _logger.LogDebug(JsonConvert.SerializeObject(new{contact, existingContact}));
            
            await _contactList.SaveChangesAsync();
            
            return new ObjectResult(existingContact);
        }
        
        //  [HttpDeleteAttribute("{contactId:int}")]
        //  public async Task<IActionResult> DeleteContact(Int32 contactId){
            
        //  }
    }
}
