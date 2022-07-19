using API.Data;
using API.Entities;
using API.extensions;
using API.Extensions;
using API.MiddelWare;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

internal class Program
{


    private static async Task Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.ApplicationServices(builder.Configuration);
        builder.Services.AddIdentityServices(builder.Configuration);

        //Seeding Data
        using (ServiceProvider serviceProvider = builder.Services.BuildServiceProvider())
        {
            try
            {
                //Get the required Services

                var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

                var UserManager = serviceProvider.GetRequiredService<UserManager<Person>>();

                var RoleManager = serviceProvider.GetRequiredService<RoleManager<AppRole>>();

                await context.Database.MigrateAsync();

                await seed.SeedUsers(UserManager, RoleManager);
            }
            catch (Exception ex)
            {
                var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Something Happened During Seeding the Data or Migrating ");
            }

        }



        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseMiddleware<ExceptionMiddleWare>();

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors(policy => policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins("https://localhost:4200"));

        app.UseAuthorization();


        app.MapControllers();


        app.Run();

    }
}