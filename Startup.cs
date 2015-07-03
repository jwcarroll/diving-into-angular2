using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Diagnostics;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;
using Microsoft.Framework.Logging.Console;
using Microsoft.Framework.Runtime;
using DivingIntoAngular.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.Data.Entity;
using AutoMapper;

namespace DivingIntoAngular
{
    public class Startup
    {
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
            .AddMvc()
            .Configure<MvcOptions>(options => {
                options.OutputFormatters
                           .Where(f => f.Instance is JsonOutputFormatter)
                           .Select(f => f.Instance as JsonOutputFormatter)
                           .First()
                           .SerializerSettings
                           .ContractResolver = new CamelCasePropertyNamesContractResolver();
                          
                
            });

            services.AddEntityFramework()
				.AddInMemoryStore()
				.AddDbContext<ContactListContext>();
            
            services.AddLogging();
            
            Mapper.CreateMap<Contact, Contact>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            ContactListInitializer.InitializeSampleData(app.ApplicationServices);
            
            loggerFactory.AddConsole(LogLevel.Information);
            
            app.UseErrorPage(ErrorPageOptions.ShowAll);

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{*path}",
                    defaults: new { controller = "Home", action = "Index" }
                );
            });
        }
    }
}
