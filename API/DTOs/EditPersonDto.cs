using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class EditPerson : PersonDto
{
    public Object[] roles { get; set; }
}
