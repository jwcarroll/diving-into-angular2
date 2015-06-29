using System;
using System.Threading.Tasks;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.InMemory;
using Microsoft.Framework.DependencyInjection;

namespace DivingIntoAngular.Models
{
	public static class ContactListInitializer{
		public static void InitializeContactList(this IServiceCollection services){
			
			using(var context = new ContactListContext()){
				context.Contacts.AddRange(
					new Contact{Id = 1, FirstName = "Josh", LastName = "Carroll", Twitter = "jwcarroll"},
					new Contact{Id = 2, FirstName = "Jeremy", LastName = "Likness", Twitter = "jeremylikness"},
					new Contact{Id = 3, FirstName = "Todd", LastName = "Motto", Twitter = "toddmotto"}
				);
				
				context.SaveChanges();
			}
		}
	}
}