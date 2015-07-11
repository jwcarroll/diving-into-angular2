using System;
using Microsoft.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace DivingIntoAngular.Models
{
    public class ContactListContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Contact>().Key(c => c.ContactId);
            
            base.OnModelCreating(builder);
        }
    }

    public class Contact
    {
        [ScaffoldColumn(false)]
        public Int32 ContactId { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String City { get; set; }
        public String Twitter { get; set; }
    }
}