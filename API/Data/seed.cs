using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace API.Data
{
    public class seed
    {
        public static async Task SeedUsers(UserManager<Person> UserManager, RoleManager<AppRole> RolesManager)
        {

            if (await UserManager.Users.AnyAsync()) return;

            var UserData = await System.IO.File.ReadAllTextAsync("Data/PersonSeed.json");

            //text.json
            var users = JsonSerializer.Deserialize<List<Person>>(UserData);
            if (users == null) return;


            var Roles = new List<AppRole>{
                new AppRole{Name="Member"},
                new AppRole{Name="Admin"},
                new AppRole{Name="Moderator"},
            };
            foreach (var role in Roles)
            {
                await RolesManager.CreateAsync(role);
            }

            var admin = new Person
            {
                UserName = "admin",

                Email = "admin@gmail.com"
            };
            await UserManager.CreateAsync(admin, "Pa$$w0rd");
            await UserManager.AddToRolesAsync(admin, new[] { "admin", "moderator" });

            foreach (var user in users)
            {
                await UserManager.CreateAsync(user, "Pa$$w0rd");
                await UserManager.AddToRoleAsync(user, "Member");

            }

        }
    }
}