using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;

namespace API.Data;

public class personRepository : IPersonRepository
{
    private readonly ApplicationDbContext _context;
    public personRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<PersonDto> GetMemberAsync(string username, bool IsCurrentUser)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Person>> GetPersonAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Person> GetPersonbyIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Person> GetPersonbyUserNameAsync(string UserName)
    {
        throw new NotImplementedException();
    }

    public Task<string> GetUserGender(string username)
    {
        throw new NotImplementedException();
    }

    public void update(Person person)
    {
        throw new NotImplementedException();
    }
}
