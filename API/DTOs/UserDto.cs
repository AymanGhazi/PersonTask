using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public int AvatarId { get; set; } = 0;
    public string userName { get; set; }
    public int Age { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string PhoneNumber { get; set; }
    public string Token { get; set; }
    public ICollection<AddressDto> Adresses { get; set; }
}
