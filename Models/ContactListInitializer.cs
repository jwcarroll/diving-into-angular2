using System;
using System.Threading.Tasks;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.InMemory;
using Microsoft.Framework.DependencyInjection;

namespace DivingIntoAngular.Models
{
	public static class ContactListInitializer{
		
		public static void InitializeSampleData(IServiceProvider services){
			using(var context = services.GetService<ContactListContext>()){
				context.Contacts.AddRange(
					new Contact{FirstName = "Josh", LastName = "Carroll", Twitter = "jwcarroll"},
					new Contact{FirstName = "Jeremy", LastName = "Likness", Twitter = "jeremylikness"},
					new Contact{FirstName = "Todd", LastName = "Motto", Twitter = "toddmotto"}
				);
				
				context.SaveChanges();
			}
		}
	}
}