using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs;

public class PersonDto
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public int Age { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public string Gender { get; set; }
    public string Phone { get; set; }
    public ICollection<Address> Adresses { get; set; }
}
