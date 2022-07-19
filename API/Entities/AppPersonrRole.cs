using API.Data;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppPersonRole : IdentityUserRole<int>
    {
        public Person user { get; set; }
        public AppRole Role { get; set; }
    }
}