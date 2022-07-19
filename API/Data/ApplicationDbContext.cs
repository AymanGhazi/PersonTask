using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ApplicationDbContext : IdentityDbContext<Person,
     AppRole, int, IdentityUserClaim<int>, AppPersonRole,
    IdentityUserLogin<int>, IdentityRoleClaim<int>,
     IdentityUserToken<int>>
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Person> persons { get; set; }
    protected override void OnModelCreating(ModelBuilder Builder)
    {
        base.OnModelCreating(Builder);

        Builder.Entity<Person>()
        .HasMany(a => a.Adresses)
        .WithOne(p => p.Person)
        .OnDelete(DeleteBehavior.Cascade);

        Builder.Entity<Person>()
        .HasMany(ur => ur.Roles)
        .WithOne(u => u.user)
        .HasForeignKey(ur => ur.UserId)
        .IsRequired();

        Builder.Entity<AppRole>()
        .HasMany(ur => ur.UserRoles)
        .WithOne(r => r.Role)
        .HasForeignKey(ur => ur.RoleId)
        .IsRequired();
    }


}
