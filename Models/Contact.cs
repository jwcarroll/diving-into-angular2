using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.InMemory;

namespace DivingIntoAngular.Models
{
    public class ContactListContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryStore();
        }
    }

    public class Contact
    {
        public Int32 Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Twitter { get; set; }
    }
}