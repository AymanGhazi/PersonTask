using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.interfaces;
using API.Interfaces;
using API.services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection ApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<IPersonRepository, personRepository>();
        services.AddScoped<ITokenService, TokenService>();

        services.AddAutoMapper(typeof(AutomapperProfiles).Assembly);
        services.AddDbContext<ApplicationDbContext>(Options =>
        {
            Options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
        services.Configure<IdentityOptions>(options =>
            {
                // Default Password settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+ ";
                options.User.RequireUniqueEmail = false;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;

            });
        return services;
    }

}
