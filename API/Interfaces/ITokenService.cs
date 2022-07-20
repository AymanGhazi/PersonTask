using System.Threading.Tasks;
using API.Data;
using API.Entities;

namespace API.interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(Person person);
    }
}