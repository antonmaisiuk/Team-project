using AutoMapper;
using Elaborate.Elaborate.Entities;
using Elaborate.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Elaborate.Data;
using System.Configuration;
using Elaborate.Helpers;

namespace Elaborate
{
    public class Startup
    {


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }

        

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            string mySqlConnectionString = "server=146.59.126.32;port=3306;uid=user;pwd=Yg5udzLxxw9ADsT;database=elaborate-db";
            //services.AddDbContext<ApplicationDbContext>(options => options.UseMySQL(mySqlConnectionString));
            services.AddDbContext<ApplicationDbContext>();
            services.AddScoped<AccountSeeder>();
            services.AddAutoMapper(this.GetType().Assembly);

            services.AddControllersWithViews();

            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<JwtService>();

            services.AddScoped<ApiService>();

            services.AddDbContext<AccountContext>(opt => opt.UseMySQL(mySqlConnectionString));
            services.AddControllers(); //Kod z Tutoriala Antona który wydaje siê byæ na razie nie potzebny poniewa¿ mamy ju¿ to


            //services.AddDbContext<AccountDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AccountSeeder seeder)
        {
            seeder.Seed();  //Wywo³anie seedera bo¿ego by Marcin Konopka
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseCors(options => options
                .WithOrigins(new[] {"http://localhost:3000", "http://localhost:8080" , "http://localhost:4200" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                );

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
