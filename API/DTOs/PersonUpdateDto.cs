using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class PersonUpdateDto
{
    public string Gender { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int AvatarId { get; set; } = 0;
    public string UserName { get; set; }
    public ICollection<AddressDto> Addresses { get; set; }
}
