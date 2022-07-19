using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;

namespace API.Interfaces;

public interface IPersonRepository
{
    void update(Person person);



    Task<IEnumerable<Person>> GetPersonAsync();
    Task<Person> GetPersonbyIdAsync(int id);
    Task<Person> GetPersonbyUserNameAsync(string UserName);
  //  Task<pageList<MemberDto>> GetMembersAsync(UserParams userparams);
    Task<PersonDto> GetMemberAsync(string username, bool IsCurrentUser);
    Task<string> GetUserGender(string username);

}
