using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.MiddleWares.Error;

public class ApiException
{
    public ApiException(int statusCode, string mesaage = null, string details = null)
    {
        StatusCode = statusCode;
        Mesaage = mesaage;
        Details = details;
    }

    public int StatusCode { get; set; }
    public string Mesaage { get; set; }
    public string Details { get; set; }
}
