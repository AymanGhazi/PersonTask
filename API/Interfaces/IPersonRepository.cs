using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Helpers;

namespace API.Interfaces;

public interface IPersonRepository
{
    void update(Person person);
    bool DeletePerson(Person person);
    Task<bool> userExist(string Email);
    Task<IEnumerable<PersonDto>> GetPersonsAsync();
    Task<Person> GetPersonbyIdAsync(int id);
    Task<PersonDto> GetPersonbyUserNameAsync(string UserName);



    bool SaveChanages();
}
