using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class personRepository : IPersonRepository
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly UserManager<Person> _userManager;
    public personRepository(ApplicationDbContext context, IMapper mapper, UserManager<Person> userManager)
    {
        _userManager = userManager;
        _mapper = mapper;
        _context = context;
    }



    public async Task<IEnumerable<PersonDto>> GetPersonsAsync()
    {
        var persosn = await _context.Users.Include(p => p.Addresses).ToListAsync();
        var mapping = _mapper.Map<IEnumerable<PersonDto>>(persosn);
        return mapping;
    }

    public async Task<Person> GetPersonbyIdAsync(int id)
    {
        return await _context.Users.Include(a => a.Addresses).SingleOrDefaultAsync(a => a.Id == id);
    }

    public async Task<PersonDto> GetPersonbyUserNameAsync(string UserName)
    {
        var Person = await _context.Users.Include(p => p.Addresses).SingleOrDefaultAsync(x => x.UserName == UserName);
        var mapping = _mapper.Map<PersonDto>(Person);
        return mapping;
    }

    public void update(Person person)
    {
        _context.Entry(person).State = EntityState.Modified;
    }
    public bool SaveChanages()
    {
        return _context.SaveChanges() > 0;
    }

    public bool DeletePerson(Person person)
    {
        _context.Users.Remove(person);
        var result = _context.SaveChanges() > 0;
        return result;
    }
    //search for exist username
    public async Task<bool> userExist(string Email)
    {
        return await _userManager.Users.AnyAsync(x => x.Email == Email.ToLower());
    }


}
