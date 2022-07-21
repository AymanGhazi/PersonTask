using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs;

public class PersonDto
{
    public int Id { get; set; }
    public int AvatarId { get; set; } = 0;
    public string userName { get; set; }
    public int Age { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public string Gender { get; set; }
    public string PhoneNumber { get; set; }
    public ICollection<AddressDto> Adresses { get; set; }
}

