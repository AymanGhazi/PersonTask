using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class personRepository : IPersonRepository
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public personRepository(ApplicationDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<pageList<PersonDto>> GetPersonsAsyncPN(PersonParams Headerparams)
    {
        var Query = _context.Users.AsQueryable();
        Query = Query.Where(u => u.Id != Headerparams.CurrentUserId);
       
        var MinDob = DateTime.Today.AddYears(-Headerparams.MaxAge - 1);
        var maxDob = DateTime.Today.AddYears(-Headerparams.MinAge);

        // Query = Query.Where(u => u.DateOfBirth >= MinDob && u.DateOfBirth <= maxDob);
        Query = Headerparams.orderBy switch
        {
            "created" => Query.OrderByDescending(u => u.Created),
            _ => Query.OrderByDescending(u => u.DateOfBirth)
        };
        return await pageList<PersonDto>.CreateAsync(Query.ProjectTo<PersonDto>(_mapper.ConfigurationProvider).AsNoTracking(), Headerparams.PageNumber, Headerparams.PageSize);
    }

    public async Task<IEnumerable<PersonDto>> GetPersonsAsync()
    {
        var persosn = await _context.Users.Include(p => p.Adresses).ToListAsync();
        var mapping = _mapper.Map<IEnumerable<PersonDto>>(persosn);
        return mapping;
    }

    public async Task<Person> GetPersonbyIdAsync(int id)
    {
        return await _context.Users.Include(a => a.Adresses).SingleOrDefaultAsync(a => a.Id == id);
    }

    public async Task<PersonDto> GetPersonbyUserNameAsync(string UserName)
    {
        var Person = await _context.Users.Include(p => p.Adresses).SingleOrDefaultAsync(x => x.UserName == UserName);
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
}
