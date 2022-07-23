using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public class Person : IdentityUser<int>
{
    public int Age { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public string Gender { get; set; }
    public ICollection<Address> Addresses { get; set; }
    public ICollection<AppPersonRole> Roles { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int AvatarId { get; set; } = 0;

}
