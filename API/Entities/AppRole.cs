using System.Collections.Generic;
using API.Data;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppPersonRole> UserRoles { get; set; }

    }
}