using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs;

public class RegisterDto
{
    public string userName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string PhoneNumber { get; set; }
    public string Gender { get; set; }

    public string Email { get; set; }
    public string password { get; set; }
    public List<Address> Addresses { get; set; }








}
