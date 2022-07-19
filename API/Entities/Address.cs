using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;

namespace API.Entities;

public class Address
{
    public int Id { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string Street { get; set; }
    public int PersonId { get; set; }
    public Person Person { get; set; }

}
